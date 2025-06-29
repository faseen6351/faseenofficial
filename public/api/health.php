<?php
// Health check endpoint
header('Content-Type: application/json');

$health = [
    'status' => 'healthy',
    'timestamp' => date('Y-m-d H:i:s'),
    'version' => '1.0.0',
    'services' => [
        'contact' => 'operational',
        'admin' => 'operational',
        'chatbot' => 'operational'
    ],
    'system' => [
        'php_version' => PHP_VERSION,
        'memory_usage' => memory_get_usage(true),
        'disk_space' => disk_free_space('.'),
        'server_time' => date('c')
    ]
];

// Check if data directory exists and is writable
if (!is_dir('../data')) {
    $health['services']['storage'] = 'warning - data directory missing';
} elseif (!is_writable('../data')) {
    $health['services']['storage'] = 'error - data directory not writable';
} else {
    $health['services']['storage'] = 'operational';
}

// Check if required files exist
$requiredFiles = ['contact.php', 'admin.php', 'chatbot.php'];
foreach ($requiredFiles as $file) {
    if (!file_exists($file)) {
        $health['services'][basename($file, '.php')] = 'error - file missing';
    }
}

echo json_encode($health, JSON_PRETTY_PRINT);
?>