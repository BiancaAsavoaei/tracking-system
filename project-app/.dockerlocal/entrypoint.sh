#!/usr/bin/env bash

echo "Installing backend dependencies..."
composer install

echo "Installing frontend dependencies..."
npm install

echo "Clearing cache..."
php artisan optimize:clear

echo "Staring Octane server..."
tini -s -- npm run dev & php artisan octane:start --host=0.0.0.0 --port=8080 --watch & wait -n