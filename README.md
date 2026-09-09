# JNL Solutions, qualification funnel

A branded copy of the multi-branch seller-qualification funnel, built for
JNL Solutions LLC (Jared Larimer), Florida Panhandle.

Live: https://andrewpcherry.github.io/jnl-funnel/
Client site: https://jnlsolutionsibuyhouses.com
Lineage: branded from `andrewpcherry/malihaus-funnel`, itself branded from
`andrewpcherry/rei-funnel`.

## The architecture

Six seller situations, **multi-select**, because real sellers are in more
than one at once. Inherited and in foreclosure. A rental that needs a roof.
A divorce with a payment already behind.

- The seller ticks everything that applies and names the most pressing one.
- The **primary** situation asks its full question set. Every other one asks
  only the questions marked `key:true`, the ones that change the answer.
- A common set (location, property type, price band, title, listing status,
  occupancy, equity, rate, timing) runs once, with `when()` guards so nobody
  is asked something their earlier answers already settled.
- **Combinations** are the point. `COMBOS` holds ten pairs, keyed on a sorted
  pair of situations, each explaining what that specific collision changes.
  At most two are shown, pairs involving the primary situation first.
- `tier()` scores the lead A/B/C off the answers, with a reason string.
- `routeOut()` ends the funnel honestly rather than harvesting a dead lead:
  renters, out-of-state property, an active listing, or already under
  contract.

Everything client-specific lives in `CONFIG` at the top of the script block.

## What is verified, and where it came from

Read off `jnlsolutionsibuyhouses.com` itself on 2026-09-10, computed styles
and page text, not assumed:

| Thing | Value |
|---|---|
| Action colour | `#F21B42` (their button red) |
| Navy | `#0D4267` (their header) |
| Headings / buttons | Oswald |
| Body | Open Sans |
| Phone | 850-696-7981 |
| Towns | Fort Walton Beach, Crestview, Destin, Navarre, Pensacola (Niceville added from their own reviews and from the ad geo in the Brain campaign log) |
| Legal | `/privacy-policy/`, `/terms-and-conditions/`, `/accessibility-statement/` |
| Consent wording | Their own Marketing consent paragraph, reproduced verbatim |
| Claims used | 7 day close, no commissions or fees, closing costs covered, no repairs, no showings, seller picks the date, any condition |
| Reviews | Six, verbatim from their published reviews page, names as given |

The logo is supplied white on transparent. `img/logo-navy.png` is the same
file recoloured for the white header; `img/logo-white.png` is the original,
used on the navy footer.

## Deliberate differences from the funnel it was copied from

1. **Geography is gated again.** The previous operator buys in sixteen
   markets so that funnel disqualified nobody. JNL buys one region, so
   "Outside Florida" routes out on the spot. Anywhere else in Florida still
   goes through and is flagged for the call.
2. **The deadline branch is rose, not coral.** JNL's action colour is a red
   and the old coral was close enough to read as the same thing.
3. **Oswald tracking is reset.** The generic funnel is set in a wide face
   with tight negative tracking throughout; Oswald is condensed and the same
   tracking closes it up.
4. **No deal structure is named anywhere.** JNL's approved public
   positioning is a cash purchase. The seller is shown their situation
   reflected back and given a call, never a menu of structures.
5. **A reviews section was added**, which the source funnel does not have,
   because JNL has a lot of strong named ones.
6. **The demo voice assistant is gone**, on Andrew's instruction, along with
   all CRM plumbing.
7. **The design was rebuilt against their actual site**, not just their colour
   values: their own photograph of Jared in the hero, their own renovated
   Panhandle ranch further down, Oswald at weight 600 with normal tracking,
   flat pill buttons at weight 500 with no shadow, and situation cards reduced
   to a 4px colour edge instead of six saturated pastel fields.

## Lead delivery: straight to email

No CRM, no AI receptionist, no GoHighLevel. On Andrew's instruction the lead
goes straight to JNL's inbox.

This is a static page, so `sendLead()` posts JSON to FormSubmit's AJAX
endpoint, which forwards it as email. Verified from formsubmit.co's own docs
on 2026-09-10: `POST https://formsubmit.co/ajax/<address>`, JSON in and out,
no account needed, unlimited submissions, 30-day archive. The payload is
flattened into reading order (tier, name, phone, property, situation, then
every question and answer) because nested objects arrive as `[object Object]`.
Reply-To is set to the seller, so Jared can just hit reply.

**Activation, and this is the bit that silently does not work:** FormSubmit
emails the recipient a confirmation link on the *first* submission and
delivers nothing until somebody clicks it. Send one test through the form and
have whoever owns the inbox confirm it **before any ad traffic arrives**.

**Recipient is unconfirmed.** `LEAD.email` is currently
`info.jnlsolutions@gmail.com`, the address JNL nominated for the signed
proposal, because they publish no lead address. Andrew to confirm where Jared
actually wants leads landing. `LEAD.cc` copies `andrew@requityai.com` so
delivery is verifiable.

**Once confirmed,** FormSubmit issues a random string that replaces the naked
address in the URL, so the inbox is not sitting in the page source for
scrapers. Swap `LEAD.email` for it when it arrives.

**reCAPTCHA is off** (`_captcha:"false"`) because there is nowhere to show a
challenge in an AJAX post. If spam starts arriving, the fix is the `_honey`
honeypot field or a real backend.

A failed send is never swallowed: the seller is told plainly and given the
phone number, rather than shown a success screen for a call that is not coming.

## Not wired yet, on purpose

- **`getGuide()` is a placeholder alert.** A JNL seller guide exists (see
  the Brain campaign log) but its hosted URL is not settled.
- **No public email address is printed.** JNL do not publish one on their
  own site, so this funnel does not invent one.

## Open questions for Jared

- Does JNL take anything other than an all-cash purchase? Nothing in the
  page assumes so, and the `cashneed` question is written as intent only.
- Is Niceville in or out? It is in their reviews and in the ad geo, but not
  in the six locations listed in their own footer.
