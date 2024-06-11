FROM php:8.3-fpm

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
COPY --from=node:20 /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=node:20 /usr/local/bin/node /usr/local/bin/node

RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm
RUN npm install -g npx chokidar

ENV COMPOSER_ALLOW_SUPERUSER 1
ENV DOCKERIZE_VERSION v0.7.0
ENV MIX_MIDDLEWARE_API_URL=/api/
ENV MIX_ON_PREM=0
ENV MIX_DISABLE_RECAPTCHA=1

RUN apt update --fix-missing && \
    apt install -y --no-install-recommends \
        software-properties-common \
        apt-utils \
        wget \
        libzip-dev \
        build-essential \
        unzip \
        git \
        jq \
        ssh \
        zlib1g-dev \
        curl \
        tini \
        libbrotli-dev

RUN pecl install swoole

RUN touch /usr/local/etc/php/conf.d/swoole.ini && \
    echo 'extension=swoole.so' > /usr/local/etc/php/conf.d/swoole.ini

RUN docker-php-ext-install pcntl


RUN echo 'alias c="clear"' >> ~/.bashrc && \
    echo 'alias art="php artisan"' >> ~/.bashrc && \
    echo 'alias migrate="php artisan migrate"' >> ~/.bashrc && \
    echo 'alias rollback="php artisan migrate:rollback"' >> ~/.bashrc && \
    echo 'alias seed="php artisan db:seed"' >> ~/.bashrc && \
    echo 'alias fresh="php artisan migrate:fresh"' >> ~/.bashrc && \
    echo 'alias cin="composer install"' >> ~/.bashrc && \
    echo 'alias cup="composer update"' >> ~/.bashrc && \
    echo 'alias cda="composer dump-autoload"' >> ~/.bashrc && \
    echo 'alias phpunit="./vendor/bin/phpunit"' >> ~/.bashrc && \
    echo 'alias c="clear"' >> ~/.bashrc && \
    echo 'alias nrp="npm run production"' >> ~/.bashrc&& \
    echo 'alias nrd="npm run dev"' >> ~/.bashrc && \
    echo 'alias nrw="npm run watch-poll"' >> ~/.bashrc && \
    echo 'alias chtml="XDEBUG_MODE=coverage ./vendor/bin/phpunit  --coverage-html ./coverage-report/"' >> ~/.bashrc

EXPOSE 8080

WORKDIR /var/www/html

RUN chmod -R 775 /var/www/html