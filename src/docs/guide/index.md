# Introduction

**Reporter _for Kirby_** is a [Kirby 3](https://getkirby.com) plugin which helps you, your editors or clients to report _bugs_, _tasks_ and to discuss _ideas_. It provides a very
handy way to collect feedback directly out of the Kirby Panel. It is a simple app, which programmatically creates issues for you. That's it.

It supports [Github](https://gitgub.com), [Gitlab](https://gitlab.com) and [Bitbucket Cloud](https://bitbucket.org) out of the box.

::: tip
If you need to work with another issue tracker, please [let me know](https://github.com/gearsdigital/reporter-for-kirby/issues/new) and I will evaluate it.
:::

Since Version 4.0.0 you can send a report via **E-Mail** if you don't want to utilize an issue tracker.

## Playground <Badge type="warning" text="beta"/>

We all know it can be _troublesome_ to evaluate a Plugin – it must be downloaded, installed and configured only to find out, that it doesn't fit your needs. This is where a
playground comes handy, right?

[Open Playground](../)

### How does it work?

For obvious reasons the given example isn't the »_real_« Panel Plugin. It would be totally impractical (if not impossible) to extract all necessary Panel dependencies only for that
very reason. Lucky me! I've designed the core of **Reporter _for Kirby_** to work standalone :wink: I used that fact and built a very simple App, which emulates the
Panel look and feel.

#### Restrictions

The example provides a fully functional implementation and outlines exactly what you can expect from **Reporter _for Kirby_**. Of course there are some restrictions which are
directly related to security concerns and in opposite of the »_real_« Panel Plugin, all text – sent to the API – is obfuscated and all links (including images and scripts), are
removed.

Besides that, I'm pretty confident this example is sufficient to provide an idea how it works.

## Getting started

### Installation

You can install **Reporter _for Kirby_** using one of the following methods. The preferred one is Composer.

#### Composer <Badge text="recommend"/>

```shell
composer require gearsdigital/reporter-for-kirby
```

::: tip Composer? What the heck?
If you aren't familiar with Composer, I recommend reading the cookbook article [»Kirby meets Composer«](https://getkirby.com/docs/cookbook/setup/composer)
by [Lukas Bestle](https://lukasbestle.com/)
:::

#### Submodule

```shell
git submodule add https://github.com/gearsdigital/reporter-for-kirby.git site/plugins/reporter-for-kirby
```

> You need to perform this command in your Kirby root directory!

#### Manual

1. Download the [latest version](https://github.com/gearsdigital/kirby-reporter/releases)
2. Extract the archive and rename the folder to `reporter-for-kirby`
3. Move the directory to `/site/plugins`

### Setup

**Reporter _for Kirby_** supports two types of reports:

1. **Issue Tracker** – Send a report to a [Github](https://github.com), [Gitlab](https://gitlab.com) and [Bitbucket Cloud](https://bitbucket.org) repository.
2. **E-Mail** – Send a report via E-Mail.

::: tip
If you need to work with another issue tracker, please [let me know](https://github.com/gearsdigital/reporter-for-kirby/issues/new) and I will evaluate it.
:::

#### Issue Tracker

Before you can start sending reports to an issue tracker, we need to prepare a couple of things:

1. [Create a Personal Access Token](#create-a-personal-access-token-pat)
2. [Configure the plugin](#configure-the-plugin)

#### Create a Personal Access Token (PAT)

Personal access tokens are substitute passwords for your account to avoid putting your real password into configuration files. It depends on your platform how to obtain a *personal
access token* (or *app password*).

For the sake of simplicity I just refer to the related help docs:

- [Gitlab](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)
- [Github](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)
- [Bitbucket Cloud](https://confluence.atlassian.com/bitbucket/app-passwords-828781300.html)

::: warning
You should create a custom user with limited scope access!
:::

#### Configure the plugin

In order to work properly, the plugin needs to be enabled and configured properly. This can be done using these options:

1. `gearsdigital.reporter-for-kirby.enabled`
2. `gearsdigital.reporter-for-kirby.repository.url`
3. `gearsdigital.reporter-for-kirby.repository.token`

If you're using Bitbucket and its Workspace feature, you might need to set `gearsdigital.reporter-for-kirby.repository.user` too. You can read more about that
here: [#33](https://github.com/gearsdigital/reporter-for-kirby/issues/33)

##### Example

```php
// site/config/config.php
return [
  'gearsdigital.reporter-for-kirby' => [
    'enabled' => true,
    'repository' => [
      'url' => 'https://bitbucket.org/gearsdigital/kirby-reporter-test',
      'token' => 'c56658e7c03a5995e2e1491e6a3b93fcde6225c9',
      'user' => 'gearsdigital-dev' // optional
    ]
  ]
];
```

### Email

To send the report via Email you need to setup these options:

1. `gearsdigital.reporter-for-kirby.enabled`
2. `gearsdigital.reporter-for-kirby.mail.from`
3. `gearsdigital.reporter-for-kirby.mail.to`
4. `gearsdigital.reporter-for-kirby.mail.subject`
5. `gearsdigital.reporter-for-kirby.repository.type` - Optional. Default is `email`

##### Example

```php
// site/config/config.php
return [
  'gearsdigital.reporter-for-kirby' => [
    'enabled' => true,
    'mail' => [
      'from' => 'mail@example.com',
      'to' => 'track@example.com',
      'subject' => 'Issue Report form gearsdigital.com',
    ]
  ]
];
```

## Options

This is the list of all available options.

```php

return [
    'gearsdigital.reporter-for-kirby' => [
        /**
         * Controls the plugin state.
         * @type boolean
         */
        'enabled' => true,
        
        /**
         * Holds repository configuration options
         * 
         * []{url: string, token: string, ?user: string}
         */
        'repository' => [
            // required - Define the repository to which the reports are being sent
            'url' => 'https://bitbucket.org/gearsdigital/kirby-reporter-test',
            
            // required - Define the personal access token
            'token' => 'c56658e7c03a5995e2e1491e6a3b93fcde6225c9',
            
             // optional – Only necessary in specific bitbucket setups
            'user' => 'gearsdigital-dev'
        ],
        
         /**
         * Holds mail configuration options
         * 
         * []{from: string, to: string, subject: string, type: string}
         */
        'mail' => [
            // required - Define sender
            'from' => 'mail@example.com',
            
            // required - Define the recipient
            'to' => 'track@example.com',
            
            // required - Define the Email-Subject
            'subject' => 'Issue Report form gearsdigital.com',
            
            // required - Define the the email type
            'type' => 'text|html'
        ],
    ],
]
```

::: tip
Learn how to [configure](https://getkirby.com/docs/guide/configuration#the-config-php) Kirby.
:::

::: danger
If you define **repository** and **mail**, repository wins because it has a higher precedence!
:::

## Customization

**Reporter _for Kirby_** is designed to be highly configurable and allows to adapt the Form and the Issue Template. This guide assumes that you are familiar
with [Blueprints](https://getkirby.com/docs/guide/blueprints/introduction) and [Templates](https://getkirby.com/docs/guide/templates/basics).

### Form

Customize the Report Form.

#### Default

```yml
# /site/plugins/reporter-for-kirby/blueprints/reporter/reporter.yml
reporter:
  fields:
    description:
      label: Description
      type: textarea
      help: Please be as precise as possible.
```

::: tip Important
You can add any field you want, but you need to adapt the [template](#templating) in order to see the fields in your preview.
:::

#### Custom

The custom blueprint will override the default blueprint, excluding the `title` which is, apart from translations, _not_ configurable. You can fully customize the Form by using [blueprint fields](https://getkirby.com/docs/guide/blueprints/fields).

To customize the form create a file named `reporter.yml` and save it to `/site/blueprints/reporter/reporter.yml`

```yml
# /site/blueprints/reporter/reporter.yml
reporter:
  fields:
    steps:
      label: Steps to reproduce
      type: textarea
      help: Please be as precise as possible.
    type:
      label: Issue Type
      type: select
      options:
        - value: bug
          text: Bug
        - value: feature
          text: Feature
        - value: enhancement
          text: Enhancement
```
### Section

This plugin provides also a `section` which can be used like any other section in your blueprints. You can learn about adding sections from the [Kirby Docs](https://getkirby.com/docs/guide/blueprints/layout#adding-sections).

This is a very handy way to collect feedback from anywhere in your panel.

```yml
# site.yml
sections:
  reporter:
    type: reporter
    headline: Report issue
    description: My custom description
```

### Templating

Reporter for Kirby comes with two templates. A template is responsible to generate the actual value which is being sent. You can and do whatever you want to adapt the output.

1. Issue Tracker
2. E-Mail

#### Issue Tracker (Repository)

##### Default

`/site/plugins/reporter-for-kirby/templates/reporter.php`

```php
## Issue Template
<?php if (isset($fields)): ?>
  <?= $fields['description']; ?>
<?php endif;?>
```

::: tip Preview
You can use the »Preview Tab« of the Issue Form to ensure your template is properly formatted. This doesn't work yet to preview Emails!
:::

##### Custom
You can override the default easily. Create a file named `reporter.php` and save it to `/site/templates/reporter.php`.

Within the template you have access to an array of all available fields. Each field consists the `key` and the selected `value`.

```php
/** @var array $fields */
var_dump($fields);
```

:::tip
Output can be anything your issue tracker can deal with. Markdown might be a good start :)
:::

#### E-Mail

You can define two types of Email-Templates, `html` and `text`:

- `/site/plugins/reporter-for-kirby/templates/emails/report.html.php`
- `/site/plugins/reporter-for-kirby/templates/emails/report.text.php`

Which one is used depends on your configured type. Default is `html`. Within a template you have access to `string $title` and `array $fields`;

##### Default (html)

`/site/plugins/reporter-for-kirby/templates/emails/report.html.php`

```php
Email HTML
Title: <?php if (isset($title)): ?><?= $title ?? ''; ?><?php endif; ?>
Fields: <?php if (isset($fields)): ?><?= $fields['description'] ?? ''; ?><?php endif; ?>
```

##### Default (text)

`/site/plugins/reporter-for-kirby/templates/emails/report.text.php`

```php
Email TEXT
Title: <?php if (isset($title)): ?><?= $title ?? ''; ?><?php endif; ?>
Fields: <?php if (isset($fields)): ?><?= $fields['description'] ?? ''; ?><?php endif; ?>
```
