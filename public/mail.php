<?php
/**
 * Kapcsolatfelvételi űrlap — nethely.hu (PHP 8).
 * A statikus oldal mellé kerül, a szerver futtatja.
 *
 * A címeket a mellette lévő mail-config.php adja, amit a deploy generál a
 * GitHub-beállításokból (lásd .github/workflows/deploy.yml):
 *  - to:   ide érkeznek az üzenetek         (MAIL_TO titok)
 *  - from: a feladó                         (CONTACT_EMAIL változó)
 *
 * A nethelynél a feladónak a tárhelyen LÉTEZŐ e-mail-címnek vagy aliasnak kell
 * lennie, különben az SMTP-szerver eldobja a levelet.
 * https://www.nethely.hu/tudasbazis/php-mail
 */

declare(strict_types=1);

$subject = 'Új üzenet a portfólió oldalról';

/** JSON vagy sima válasz, attól függően, hogy fetch hívta-e. */
function respond(int $status, string $message): never
{
    http_response_code($status);
    $wantsJson = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');

    if ($wantsJson) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $status === 200, 'message' => $message], JSON_UNESCAPED_UNICODE);
    } else {
        header('Content-Type: text/html; charset=utf-8');
        echo '<!doctype html><meta charset="utf-8"><title>', htmlspecialchars($message), '</title>',
             '<body style="background:#090E11;color:#E6EDEF;font:16px system-ui;padding:3rem">',
             '<p>', htmlspecialchars($message), '</p>',
             '<p><a style="color:#E4C98F" href="/">&larr; Vissza</a></p>';
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, 'Hibas keres.');
}

$config = is_file(__DIR__ . '/mail-config.php') ? require __DIR__ . '/mail-config.php' : null;
$to     = is_array($config) ? (string) ($config['to'] ?? '') : '';
$from   = is_array($config) ? (string) ($config['from'] ?? '') : '';

if (!filter_var($to, FILTER_VALIDATE_EMAIL) || !filter_var($from, FILTER_VALIDATE_EMAIL)) {
    error_log('mail.php: hianyzo vagy hibas mail-config.php');
    respond(500, 'A levelkuldes nincs beallitva.');
}

// Spamcsapda: ha kitöltötték, csendben "sikeres" választ adunk
if (!empty($_POST['website'] ?? '')) {
    respond(200, 'Koszonom, megkaptam az uzenetet.');
}

$name    = trim((string) ($_POST['name'] ?? ''));
$email   = trim((string) ($_POST['email'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));
$lang    = ($_POST['lang'] ?? 'hu') === 'en' ? 'en' : 'hu';

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, $lang === 'en' ? 'Please fill in every field correctly.' : 'Kerlek, tolts ki minden mezot helyesen.');
}

if (mb_strlen($message) > 5000 || mb_strlen($name) > 200) {
    respond(422, $lang === 'en' ? 'The message is too long.' : 'Az uzenet tul hosszu.');
}

// Fejléc-injektálás elleni védelem
$safeName  = preg_replace('/[\r\n]+/', ' ', $name);
$safeEmail = preg_replace('/[\r\n]+/', '', $email);

$body = "Nev: {$safeName}\n"
      . "E-mail: {$safeEmail}\n"
      . 'Nyelv: ' . $lang . "\n"
      . 'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? '-') . "\n"
      . 'Ido: ' . date('Y-m-d H:i:s') . "\n\n"
      . $message;

$headers = [
    'From: ' . mb_encode_mimeheader('Portfólió', 'UTF-8') . " <{$from}>",
    // A "Válasz" gomb a látogatónak címez, nem a feladó címnek
    'Reply-To: ' . $safeEmail,
    'Content-Type: text/plain; charset=utf-8',
    'MIME-Version: 1.0',
];

// Az "-f" a boríték-feladót is a létező címre állítja (a nethely ezt is elfogadja)
$sent = mail(
    $to,
    mb_encode_mimeheader($subject, 'UTF-8'),
    $body,
    implode("\r\n", $headers),
    '-f' . $from
);

if (!$sent) {
    respond(500, $lang === 'en' ? 'Could not send. Please email me directly.' : 'Nem sikerult elkuldeni. Irj inkabb kozvetlenul e-mailben.');
}

respond(200, $lang === 'en' ? 'Thank you, your message arrived.' : 'Koszonom, megkaptam az uzenetet.');
