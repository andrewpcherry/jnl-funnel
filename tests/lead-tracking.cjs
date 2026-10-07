const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const {webcrypto: crypto} = require('node:crypto');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m => m[1]);
scripts.forEach(script => new vm.Script(script));
const code = html.slice(html.indexOf('function trackAcceptedLead'), html.indexOf('\n\n\nfunction utm'));
async function run(response, gpc = false, trackingThrows = false) {
  const calls = [], button = {textContent:'Send', disabled:false}, error = {innerHTML:''}, state = {};
  const ctx = {
    window:{crypto, TextEncoder, console:{error(){}}, oaiq:(...args)=>{
      if(trackingThrows) throw Error('tracking unavailable');
      calls.push(args);
    }}, navigator:{globalPrivacyControl:gpc}, crypto, TextEncoder, Uint8Array,
    Promise, Date, Math, console:{error(){}},
    document:{querySelector:()=>button, getElementById:()=>error},
    LEAD:{endpoint:()=> 'https://example.invalid'}, leadEmailFields:()=>({}),
    fetch:async()=>response, S:state, render:()=>{}, CONFIG:{phoneHref:'tel:123', phone:'123'}
  };
  ctx.oaiq = ctx.window.oaiq;
  vm.createContext(ctx); vm.runInContext(code, ctx);
  const lead = {contact:{email:' TEST@EXAMPLE.COM ', phone:'(850) 555-0100'}};
  ctx.sendLead(lead, {});
  await new Promise(resolve=>setTimeout(resolve, 30));
  return {calls, state, error, ctx, lead};
}
(async()=>{
  for(const success of [true, 'true']) {
    const result = await run({ok:true, json:async()=>({success})});
    assert.equal(result.state.phase, 'done');
    assert.equal(result.calls.filter(c=>c[1]==='lead_created').length, 1);
    assert.equal(result.calls[0][1].user.email_sha256.length, 64);
    assert.equal(result.calls[0][1].user.phone_number_sha256.length, 64);
    assert(!JSON.stringify(result.calls).includes('TEST@'));
    result.ctx.trackAcceptedLead(result.lead);
    await new Promise(resolve=>setTimeout(resolve, 10));
    assert.equal(result.calls.filter(c=>c[1]==='lead_created').length, 1);
  }
  for(const response of [
    {ok:true, json:async()=>({success:false})},
    {ok:true, json:async()=>({})},
    {ok:true, json:async()=>({success:'false'})},
    {ok:false, status:500},
    {ok:true, json:async()=>{throw Error('invalid JSON');}}
  ]) {
    const result = await run(response);
    assert(!result.state.phase);
    assert.equal(result.calls.length, 0);
    assert(result.error.innerHTML.includes('did not go through'));
  }
  let result = await run({ok:true,json:async()=>({success:true})}, true);
  assert.equal(result.state.phase,'done'); assert.equal(result.calls.length,0);
  result = await run({ok:true,json:async()=>({success:true})}, false, true);
  assert.equal(result.state.phase,'done');
  assert(html.includes('email:  "info.jnlsolutions@gmail.com"'));
  assert(html.includes('cc:     "jpaul@7kidsandflipping.com,andrew@requityai.com"'));
  console.log('PASS: script syntax; accepted responses; rejected/invalid responses; HTTP failure; deduplication; hashed matching; GPC; tracking failure isolation; recipient configuration. No network calls or emails sent.');
})().catch(error=>{console.error(error);process.exit(1);});
