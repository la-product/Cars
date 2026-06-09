<?php
class DbConnect
{
    private $options = array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_EMULATE_PREPARES => false,
    );

    public function connect()
    {
        // načti .env
        $env = parse_ini_file(__DIR__ . '/.env');

        try {
            $conn = new PDO(
                'mysql:host=' . $env['DB_SERVER'] .
                    ';dbname=' . $env['DB_NAME'] . ';charset=utf8',
                $env['DB_USER'],
                $env['DB_PASS'],
                $this->options
            );
            return $conn;
        } catch (PDOException $e) {
            echo "Database Error: " . $e->getMessage();
        }
    }
}
