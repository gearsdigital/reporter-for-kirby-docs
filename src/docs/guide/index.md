# Introduction

**Reporter _for Kirby_** is a [Kirby 3](https://getkirby.com) plugin which helps you, your editors or clients to report _bugs_, _tasks_ and to discuss _ideas_.
It provides a very handy way to collect feedback directly out of the Kirby Panel.

## How it works

TBD

## Playground

I know, it can be _troublesome_ to evaluate a Plugin. It must be downloaded. You have to install and configure it properly only then to find out that it's not what you are looking for.

But say no more: _I got you covered!_ You probably haven't noticed it yet, but the Form on Homepage isn't a screenshot :wink: It provides a fully functional example which you can play around with.

There are some **restrictions**:

1. You can add only one issue per twenty minutes.
2. The amount of characters you can add is limited.
3. The created issue gets deleted shortly after it was created.

## Getting started

### Installation

You can install **Reporter _for Kirby_** using one of the following methods. The preferred one is Composer.

#### Composer

```shell
composer require gearsdigtal/reporter-for-kirby
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

**Reporter _for Kirby_** supports [Github](https://gitgub.com), [Gitlab](https://gitlab.com) and [Bitbucket Cloud](https://bitbucket.org).
If you need to work with another issue tracker, please [let me know](https://github.com/gearsdigital/reporter-for-kirby/issues/new) and I will evaluate it.

Before you can start using the plugin, we need to prepare a couple of things:

1. [Create a Personal Access Token](#create-a-personal-access-token-pat)
2. [Configure the plugin](#configure-the-plugin)

#### Create a Personal Access Token (PAT)

Personal access tokens are substitute passwords for your account to avoid putting your real password into configuration files. It depends on your platform how to obtain a *personal access token* (or *app password*).

For the sake of simplicity I just refer to the related help docs:

- [Gitlab](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)
- [Github](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)
- [Bitbucket Cloud](https://confluence.atlassian.com/bitbucket/app-passwords-828781300.html)

::: warning
You should create a custom user with limited scope access!
:::

#### Configure the plugin

In order to work properly, the plugin needs to be configured properly. You need to enable the plugin and configure
your issue tracker. This can be done using these options:

1. `kirby.reporter.enabled`
2. `kirby-reporter.repository`
3. `kirby-reporter.token`

If you're using Bitbucket and its Workspace feature, you might need to set `kirby-reporter.bitbucket.user` too. You can read more about that here: [#33](https://github.com/gearsdigital/kirby-reporter/issues/33)

##### Example

```php
// site/config/config.php
return [
  'kirby-reporter.enabled' => true,
  'kirby-reporter.repository' => 'https://github.com/gearsdigital/kirby-reporter',
  'kirby-reporter.token' => 'c56658e7c03a5995e2e1491e6a3b93fcde6225c9'
];
```

## Options

This is the list of all available options.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `kirby-reporter.enabled` | `string` | **Required**.  Control the plugin state. |
| `kirby-reporter.repository` | `string` | **Required**. Fully qualified URL of the repository to which the issues are reported. |
| `kirby-reporter.token` | `string` | **Required**. Your personal access token (PAT) |
| `kirby-reporter.bitbucket.user` | `string` | Define a custom Bitbucket user. Learn more about it in Issue [#33](https://github.com/gearsdigital/kirby-reporter/issues/33)

::: tip
Learn how to [configure](https://getkirby.com/docs/guide/configuration#the-config-php) Kirby.
:::

## Customization

**Reporter _for Kirby_** is designed to be highly configurable and allows to adapt the Form and the Issue Template.

### Form

#### Default

```yml
# /site/plugins/kirby-reporter/blueprints/reporter/reporter.yml
reporter:
  fields:
    description:
      label: Description
      type: textarea
      help: Please be as precise as possible.
```

::: tip Important
You can add any field you want, but you need to adapt the [template](#template) in order to see the fields in your preview.
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

### Template

The template is responsible to generate the actual value which is being sent. You can and do whatever you want to adapt the output, but the output is always treated as plain text.

#### Default

`/site/plugins/kirby-reporter/templates/reporter.php`

```php
## Issue Template
<?php if (isset($fields)): ?>
  <?= $fields['description']; ?>
<?php endif;?>
```

::: tip Preview
You can use the »Preview Tab« of the Issue Form to ensure your template is formatted properly.
:::

#### Custom
You can override the default easily. Create a file named `reporter.php` and save it to `/site/templates/reporter.php`.

Within the template you have access to an array of all available fields. Each field consists the `key` and the selected `value`.

```php
/** @var array $fields */
var_dump($fields);
```
:::tip
Output can be anything your issue tracker can deal with. Markdown might be a good start :)
:::
