# JNL Solutions LLC setup review, October 7, 2026

Status: review-only, not deployed. Built on PR #1 head 020dd8ba56c260077b5ec1b86aaf5bdb1383f4ee. Original local checkout was clean. No WordPress changes.

## Prepared website changes

- Preserve PR #1's badge removal, preparation/access qualifications and preferred-date qualification.
- Add the direct-buyer, not-your-agent, no-obligation and no-guaranteed-offer disclosure near the first CTA.
- Use Clear / Closing terms in the existing value strip.
- Limit stopping the enquiry to before a binding purchase agreement; explain that subsequent obligations depend on the agreement.
- Use current-condition purchase wording, property-specific repair/improvement wording, and illustrative-photo alt text rather than unverified ownership claims.
- Add property-specific price, terms and timing disclosure at the bottom.
- Add explicit OAI-AdsBot and OAI-SearchBot permissions in robots.txt.

## Existing measurement reviewed

Static HTML/JavaScript on GitHub Pages, browser Pixel only. Existing pixel FPDGjoM9NNahqAdBx3PsRb belongs to the newer JNL Solutions account, verified by Ads Manager conversion-source read. SDK loads once in the head; page_viewed already covered. lead_created is called only after HTTP success plus FormSubmit success=true or string "true". Tracking errors do not affect successful enquiries. Per-lead adsMeasured prevents repeated emission. Unique event_id generated per accepted lead. Normalized email and phone are hashed, then passed to init({user}); no raw contact, property or situation data passed to measure. opt_out=true retained. GPC denies measurement and suppresses accepted-lead reporting. SDK manages browser attribution context; no manual oppref manipulation. No debug enabled.

No additional supported events are added: no commerce/cart/checkout/order, registration, subscription, trial or confirmed appointment-booking boundary. Guide download is not a second lead. No CAPI: this repository has no owned server runtime or secret handling for FormSubmit's acceptance boundary. Existing script remains unchanged pending verified LLC source mapping.

## Account setup gate

Authenticated LLC Conversions page and connector both show no data source or conversion setting. Creating a source explicitly accepts OpenAI Conversion Terms. Awaiting Andrew's action-time permission; no terms accepted and no source created.

The newer account's authenticated interface displays "This industry isn't eligible to serve ads in ChatGPT right now." Its source-sharing interface is consequently inaccessible. Legitimate sharing is unverified. Do not reuse its source as LLC-owned. If permission is given, create an LLC-owned source and Lead Generated event (lead_created, matching 30-day click/1-day view configuration), read ownership/mapping back, then prepare the documented multiple-pixel integration if existing tracking must remain. Do not place an invented or unverified ID in the page.

## Lead delivery

Verified configuration, preserved unchanged: To info.jnlsolutions@gmail.com; CC jpaul@7kidsandflipping.com,andrew@requityai.com; FormSubmit AJAX endpoint. No current live submission or inbox delivery test performed. Ask before sending an explicitly labelled test enquiry. An accepted response is not proof of actual inbox delivery.

## Ad-destination plan, not applied

Only Sell Fast Timeline Ad v2, Foreclosure Ad v2 and Tax Delinquency Ad v2, in JNL Solutions LLC, are in scope. Fresh connector reads show all three active/approved with https://jnlsolutionsibuyhouses.com as destination, the same image token and full-frame crop {x:0,y:0,width:1,height:1}.

New URL for each: https://go.jnlsolutionsibuyhouses.com/?utm_source=chatgpt&utm_medium=paid&utm_campaign=jnl_panhandle

Authenticated Edit Ad interface has a separate Link field and separate Edit image control. Proposed method: change Link only, save only after explicit approval, then compare all creative fields including file_id and image_crop against baseline. Method is inspected but preservation after save is not yet proven. Do not use the connector's replacement-shaped creative update without explicit crop support. Stop on any unexpected change.

Parent LeadGen_Panhandle remains paused. Preserve its $50/day USD clicks objective, Florida/Panama City/ZIP targeting, $2 CPC ad-group bids, all context hints and all statuses. Its conversion attachment is currently empty; no campaign modification or objective change is authorized. Three paused/rejected original ads remain untouched. No campaign creation or activation.

## Verification

- node tests/lead-tracking.cjs: passed syntax, accepted boolean/string responses, rejection/missing/false/invalid JSON, HTTP failure, duplicate guard, hashed matching, GPC, tracking failure isolation, recipient configuration. Mock-only; no emails or live event requests.
- git diff --check: passed.
- Local Chrome review: desktop 1680px and mobile 390px, no horizontal overflow; no visible placeholder links or review badge; topic selection and Continue advance correctly. Local preview uses a response-only CSP to block SDK requests and FormSubmit; this CSP is not a production change.
- HTTP check using OAI-AdsBot user-agent: tagged public URL returned 200, zero redirects. Public robots.txt returned 404. This is not proof of a real crawler visit, geographic reachability, or every provider-level WAF rule. No authenticated challenge was observed in that HTTP response.
- Official guidance read: https://help.openai.com/en/articles/20001243-advertiser-guidance-for-allowing-openai-web-crawlers
- SDK syntax read: https://developers.openai.com/ads/measurement-pixel and https://developers.openai.com/ads/multiple-pixels

## Required approvals and remaining checks

1. Action-time permission to accept LLC Conversion Terms and create its source.
2. Verify LLC ownership and source-to-lead-event mapping, implement and mock-test pixel integration.
3. Present exact final diff and obtain permission before publishing the page or changing the three live destinations.
4. Ask separately before the labelled live enquiry; verify email copy and LLC event receipt. No actual paid-click attribution claim.
5. Read back approved live changes, keeping campaign paused. Industry restriction and destination review remain unresolved; this is not an approval or a workaround.

Before deploying, review privacy, security, consent and data-handling requirements. Existing privacy policy must remain consistent with final pixel configuration. Account setup alone does not prove live measurement, inbox delivery, ad eligibility or serving.
