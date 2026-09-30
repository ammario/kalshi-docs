---
url: https://docs.kalshi.com/getting_started/sub_users_vs_subaccounts
lastmod: 2026-09-23T18:40:46.346Z
---
> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Sub-users vs. Subaccounts

> Sub-users add people to an account; subaccounts split its funds

Sub-users and subaccounts solve different problems. A **sub-user** is an
additional login that lets someone else use your account with limited
permissions. A **subaccount** is a separate balance and set of positions inside
your account. Sub-users control *who* can act on the account; subaccounts
control *which funds and positions* an action uses.

In the Kalshi web app, sub-users appear as **Team Members**.

## At a glance

| | Sub-users (Team Members) | Subaccounts |
| - | - | - |
| **What it is** | Another login on your account, with its own email and password | A separate balance and set of positions within your account |
| **Balance and positions** | Shares the account's | Has its own |
| **Permissions** | Read, Trade, and Transfers, set per sub-user | None of its own; an API key can be restricted to one subaccount |
| **Set up by** | Kalshi enables the feature; the account owner adds sub-users in the web app | The account owner, through the API |
| **Availability** | Institutions, on request | Direct accounts on the [Advanced API tier](/getting_started/rate_limits#tier-qualification) or above |

## Sub-users

Each sub-user signs in to the Kalshi web app with their own email and password
and acts on your account: the orders they place and the funds they move are
yours. Sub-users can't sign in to the Kalshi mobile app.

Sub-users are for institutions that want to provision logins for their team
members with different scopes. Kalshi enables them for an account on request.
The account owner then adds, edits, and revokes them on the **Team Members**
page of the web app, and gives each one any combination of three permissions:

| Permission | Allows | Scope |
| - | - | - |
| **Read** | View portfolio, markets, and history | `read` |
| **Trade** | Place and cancel orders, including RFQs and quotes | `write::trade` |
| **Transfers** | Deposit and withdraw funds and manage payment methods | `write::transfer` |

Granting Trade or Transfers also grants Read. For a trader who shouldn't move
money, grant Read and Trade and leave Transfers off. Changing a sub-user's
permissions or revoking their access signs them out immediately.

Whatever their permissions, sub-users can't create or manage API keys, and
can't add or manage other sub-users. Orders and fills belong to the account and
don't record which sub-user placed them.

## Subaccounts

Every account has a primary subaccount (`0`). Eligible accounts can add
numbered subaccounts `1`–`63` with
[Create Subaccount](/api-reference/portfolio/create-subaccount). Cash moves
between them with
[Transfer Between Subaccounts](/api-reference/portfolio/transfer-between-subaccounts)
and never leaves the account. See [Subaccounts](/getting_started/subaccounts)
for numbering, transfers, and restricted API keys.

A subaccount has no login or permissions of its own. The account owner and
every sub-user can act on all subaccounts, within their permissions.

## Using them together

Sub-user permissions apply to the whole account, so you can't limit a sub-user
to one subaccount. To confine trading to one subaccount, use an API key
[restricted to that subaccount](/getting_started/subaccounts#restricted-api-keys):
it can read and trade only that subaccount and can't transfer funds. Only the
account owner can create API keys.

| Goal | Use |
| - | - |
| Let a colleague trade in the web app without sharing your login | A sub-user with Read and Trade |
| Stop a colleague from depositing or withdrawing | A sub-user without Transfers |
| Keep each strategy's balance and positions separate | One subaccount per strategy |
| Give a bot or API trader a fixed amount of capital | A subaccount funded with that amount, plus an API key restricted to it |
| Remove a person's access without moving funds | Revoke their sub-user |
