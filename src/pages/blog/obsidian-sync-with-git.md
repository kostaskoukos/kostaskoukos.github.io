---
layout: ../../BlogLayout.astro
title: "How I made my own Obsidian Sync with Git"
date: "2026-08-26"
---

Lately I have been using [Obsidian](https://obsidian.md/) for my personal CS knowledge base and notes.
I also wanted to be able to use the android app and sync between the two.
However, [Obsidian Sync](https://obsidian.md/sync) is a paid service, so let's make our own with Git!

## 1. Setup

First create a Github repository to store our notes. I created a private
repository called `obsidian-notes` and cloned it to my local machine.
Then open it with Obsidian as a vault.

### `.gitignore`

Because Obsidian creates a lot of files that are not needed for syncing, I created a `.gitignore` file in the root of the vault with the following content:

```
.obsidian/workspace.json
.obsidian/workspace-mobile.json
.obsidian/graph.json
.trash/
```

The desktop part is now done.

## 2. Transfer to Android

In order for the plugin to work on Android, it needs to see the .git folder.
The simplest way I found was to connect my phone to my computer with a USB-c cable and copy the entire folder over to my phone.

## 3. Obsidian Git plugin

On the android app, search for the [obsidian-git](https://github.com/Vinzent03/obsidian-git) plugin on the community plugins, install and enable it.
This plugins mimicks the most common git commands like commit (obviously), push, pull, etc directly in Obsidian.
Test it by making a change to the vault and committing it.
The plugin can fill the message for you with the current timestamp.

> [!WARNING]
> The mobile version is still experimental, so merging or advanced commands may not be supported.

## 4. Pushing on mobile

Because the git executable is not available on Android, you will need to manually add your GitHub credentials to the plugin settings.

### 1. Generate a personal access token

Go to your [GitHub personal access tokens](https://github.com/settings/personal-access-tokens) and generate a new token with access to your repo and permissions:

-  Read access to metadata
-  Read and write access to code

### 2. Add it to obsidian-git

Then go to the plugins settings **on mobile** under Authentication/commit author and enter your GitHub username and the personal access token you just generated.
Optionally, you can also set your author name and email address.

> [!NOTE]
> Github ended support for password authentication in August 2021, so you cannot authenticate with username/password anymore.

## 5. Done!
Try pushing your changes and check if they are reflected in your GitHub repository.
You should now be able to sync your notes between your desktop and mobile devices.
You can also customize the plugin settings to fit your needs, like auto-pulling on startup or auto commit on interval.
