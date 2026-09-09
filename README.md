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

## Not wired yet, on purpose

- **`submitLead()` posts nowhere.** It validates, builds the `lead` payload
  and logs it to the console. Point it at the CRM webhook before this takes
  paid traffic. JNL's destination CRM is unconfirmed.
- **`getGuide()` is a placeholder alert.** A JNL seller guide exists (see
  the Brain campaign log) but its hosted URL is not settled.
- **No public email address is printed.** JNL do not publish one on their
  own site, so this funnel does not invent one.

## Open questions for Jared

- Does JNL take anything other than an all-cash purchase? Nothing in the
  page assumes so, and the `cashneed` question is written as intent only.
- Is Niceville in or out? It is in their reviews and in the ad geo, but not
  in the six locations listed in their own footer.
