'use strict';
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const labelEsc=s=>esc(s).replace(/\{/g,'&#123;').replace(/\}/g,'&#125;').replace(/\$/g,'&#36;');
const uid=()=> 'i'+Date.now().toString(36)+Math.random().toString(36).slice(2,8);
const defaults={bg:'#1a2e1a',text:'#eef7ee',accent:'#4ade80',button:'#233023',border:'#4f624f',radius:16,columns:2,fontSize:14,padding:20,maxWidth:760,mobileColumns:2,mobileFontSize:14,mobilePadding:14,theme:'forest',textAlign:'left',buttonAlign:'left',buttonTextAlign:'center'};
const themePresets={
 auto:{label:'🔄 Auto',bg:'#282a36',text:'#f8f8f2',button:'#21222c',accent:'#6272a4',border:'#67686f'},dark:{label:'🌙 Dark',bg:'#1e1e24',text:'#f4f4f5',button:'#121214',accent:'#60a5fa',border:'#54555b'},light:{label:'☀️ Light',bg:'#e8e6e1',text:'#28303d',button:'#f0ede6',accent:'#2563eb',border:'#b3b4b6'},
 midnight:{label:'🖤 Midnight',bg:'#000000',text:'#f5f5f5',button:'#0d0d0d',accent:'#60a5fa',border:'#454647'},cream:{label:'🍪 Cream',bg:'#ede8db',text:'#403b31',button:'#f7f3e8',accent:'#b45309',border:'#b8b3a5'},nord:{label:'❄️ Nord',bg:'#2e3440',text:'#eceff4',button:'#3b4252',accent:'#88c0d0',border:'#616773'},
 solarized:{label:'☕ Solarized',bg:'#002b36',text:'#eee8d5',button:'#073642',accent:'#268bd2',border:'#284b53'},rose:{label:'🌸 Rose',bg:'#f2e4e8',text:'#402d35',button:'#f9f0f3',accent:'#db2777',border:'#bbaab1'},mint:{label:'🌿 Mint',bg:'#ddf0e8',text:'#263a32',button:'#ecf7f1',accent:'#059669',border:'#a2b7ae'},
 sky:{label:'💙 Sky',bg:'#dce8f5',text:'#253646',button:'#eaf1fa',accent:'#0284c7',border:'#a1afbd'},lavender:{label:'💐 Lavender',bg:'#e8e0f2',text:'#382e47',button:'#f2ecfa',accent:'#7c3aed',border:'#b0a6bb'},peach:{label:'🍑 Peach',bg:'#f2e4d8',text:'#48362b',button:'#faf0e8',accent:'#ea580c',border:'#bbad9f'},
 mocha:{label:'🤎 Mocha',bg:'#594d43',text:'#f7f1eb',button:'#685c52',accent:'#e0a87a',border:'#84786e'},slate:{label:'🪨 Slate',bg:'#48556a',text:'#f0f5fb',button:'#566378',accent:'#7eb8e8',border:'#758092'},dusk:{label:'🌆 Dusk',bg:'#524562',text:'#f5eefb',button:'#625572',accent:'#c8a0e8',border:'#7d718c'},
 olive:{label:'🟢 Olive',bg:'#4a5540',text:'#f2f5ed',button:'#586650',accent:'#a0d070',border:'#757f6a'},forest:{label:'🌲 Forest',bg:'#1a2e1a',text:'#eef7ee',button:'#233023',accent:'#4ade80',border:'#4f624f'},ocean:{label:'🌊 Ocean',bg:'#0f1e30',text:'#edf7ff',button:'#152838',accent:'#38bdf8',border:'#445465'},wine:{label:'🍷 Wine',bg:'#2a1520',text:'#fff0f4',button:'#351d28',accent:'#fb7185',border:'#614b55'}
};
const imageDefault=()=>({asset:'',fit:'cover',position:'center',height:180,mobileHeight:120});
const buttonImageDefault=()=>({asset:'',backgroundAsset:'',backgroundPosition:'center',backgroundShade:35});
const opening=(title='새 퍼메',body='')=>({id:uid(),title,ko:body,en:'',image:buttonImageDefault()});
function demo(){return {format:'misel-first-message-project',version:1,name:'야니크 · 선택기 연습',namespace:'fm_jannik',marker:'⪫⩊⪪',title:'어디서부터 시작할까?',subtitle:'관계와 첫 장면을 골라 주세요.',toggleLabel:'퍼메',languages:true,useRelations:true,resetButton:true,design:{...defaults},images:{header:imageDefault(),background:{...imageDefault(),opacity:25}},relations:[{id:uid(),name:'소꿉친구',description:'오래 알고 지낸 사이',image:buttonImageDefault(),openings:[opening('훈련이 끝난 저녁','훈련장 문이 열리고 야니크가 걸어 나왔다.\n\n“기다렸어? 같이 돌아가자.”'),opening('익숙한 방문','초인종이 울렸다. 문 너머에서 익숙한 목소리가 들렸다.\n\n“나야. 들어가도 돼?”')]},{id:uid(),name:'푹시 / 마스코트',description:'코트 옆에서 마주치는 사이',image:buttonImageDefault(),openings:[opening('경기 시작 전','경기 시작을 알리는 음악 사이로 야니크가 손을 흔들었다.')]},{id:uid(),name:'자유 관계',description:'새로운 관계의 시작',image:buttonImageDefault(),openings:[opening('우연한 만남')]}]};}
function starter(){const p=demo();p.name='새 캐릭터';p.namespace='fm_'+uid();p.title='첫 장면 선택';p.subtitle='';p.relations=[];return p;}
let project=location.search.includes('demo=1')?demo():starter(), selected={relation:project.relations[0]?.id,opening:null},tab='content',preview={relation:null,opening:null,language:'en',closed:false},outputKey='firstMessage';
let previewMobile=window.innerWidth<=600;
try{const mode=localStorage.getItem('misel-first-message-preview');if(mode)previewMobile=mode==='mobile';}catch{}
function syncPreviewMode(){$('#preview-shell').classList.toggle('mobile',previewMobile);$('#width').textContent=previewMobile?'PC 보기':'모바일 보기';}
function status(t){$('#status').textContent=t;}
function validate(p){
 if(!p||p.format!=='misel-first-message-project'||p.version!==1)throw Error('퍼메 스튜디오 v1 프로젝트 JSON을 골라 주세요.');
 const str=(v,max=200000)=>typeof v==='string'&&v.length<=max;
 for(const k of ['name','namespace','marker','title','subtitle','toggleLabel'])if(!str(p[k],500))throw Error('기본 설정 형식이 올바르지 않아요.');
 if(!/^[A-Za-z][A-Za-z0-9_]{0,39}$/.test(p.namespace))throw Error('변수 접두사는 영문으로 시작하는 영문·숫자·밑줄 40자 이내여야 해요.');
 if(!p.marker.trim()||/[{}\r\n]/.test(p.marker))throw Error('호출 문구는 빈칸·줄바꿈·중괄호 없이 입력해 주세요.');
 if(p.useRelations===undefined)p.useRelations=true;
 if(typeof p.languages!=='boolean'||typeof p.useRelations!=='boolean'||typeof p.resetButton!=='boolean')throw Error('버튼 설정이 올바르지 않아요.');
 if(!p.design)throw Error('디자인 설정이 없어요.');
 if(!p.images)p.images={header:imageDefault(),background:{...imageDefault(),opacity:25}};
 for(const k of ['header','background']){if(!p.images[k])p.images[k]=k==='background'?{...imageDefault(),opacity:25}:imageDefault();const x=p.images[k];if(typeof x.asset!=='string'||x.asset.length>200||/[{}<>"'\r\n]/.test(x.asset)||!['cover','contain'].includes(x.fit)||!['top','center','bottom'].includes(x.position)||!Number.isInteger(x.height)||x.height<40||x.height>600||!Number.isInteger(x.mobileHeight)||x.mobileHeight<40||x.mobileHeight>600)throw Error('이미지 설정을 확인해 주세요.');}
 if(p.images.background.opacity===undefined)p.images.background.opacity=25;if(!Number.isInteger(p.images.background.opacity)||p.images.background.opacity<0||p.images.background.opacity>100)throw Error('배경 투명도를 확인해 주세요.');
 for(const k of ['mobileColumns','mobileFontSize','mobilePadding','maxWidth'])if(p.design[k]===undefined)p.design[k]=defaults[k];
 if(p.design.theme===undefined)p.design.theme=({'#173e32':'forest','#fff9ed':'paper','#242537':'night'})[p.design.bg]||'custom';
 if(p.design.theme==='paper')p.design.theme='cream';if(p.design.theme==='night')p.design.theme='dark';
 if(![...Object.keys(themePresets),'custom'].includes(p.design.theme))throw Error('테마 설정을 확인해 주세요.');
 for(const k of ['textAlign','buttonAlign','buttonTextAlign']){if(p.design[k]===undefined)p.design[k]=defaults[k];if(!['left','center','right'].includes(p.design[k]))throw Error('정렬 설정을 확인해 주세요.');}
 if(p.languageOrder===undefined)p.languageOrder=['ko','en'];
 if(!Array.isArray(p.languageOrder)||p.languageOrder.length!==2||new Set(p.languageOrder).size!==2||p.languageOrder.some(x=>!['ko','en'].includes(x)))throw Error('언어 버튼 순서를 확인해 주세요.');
 for(const k of ['bg','text','accent','button','border'])if(!/^#[0-9a-f]{6}$/i.test(p.design[k]))throw Error('색상은 6자리 HEX 값이어야 해요.');
 for(const [k,min,max] of [['radius',0,36],['columns',1,8],['mobileColumns',1,8],['mobileFontSize',11,24],['mobilePadding',8,40],['fontSize',11,24],['padding',8,40],['maxWidth',280,1600]])if(!Number.isInteger(p.design[k])||p.design[k]<min||p.design[k]>max)throw Error('디자인 수치 범위를 확인해 주세요.');
 if(!Array.isArray(p.relations)||p.relations.length>100)throw Error('관계는 최대 100개까지 사용할 수 있어요.');
 const ids=new Set();const checkId=id=>{if(typeof id!=='string'||!/^i[a-z0-9]+$/.test(id)||ids.has(id))throw Error('중복되거나 잘못된 항목 ID가 있어요.');ids.add(id);};
 const checkButtonImage=x=>{if(!x)x=buttonImageDefault();for(const k of ['backgroundAsset','backgroundPosition','backgroundShade'])if(x[k]===undefined)x[k]=buttonImageDefault()[k];if(!str(x.asset,200)||!str(x.backgroundAsset,200)||/[{}<>"'\r\n]/.test(x.asset+x.backgroundAsset)||!['top','center','bottom'].includes(x.backgroundPosition)||!Number.isInteger(x.backgroundShade)||x.backgroundShade<0||x.backgroundShade>100)throw Error('버튼 이미지 설정을 확인해 주세요.');return x;};
 for(const r of p.relations){checkId(r.id);r.image=checkButtonImage(r.image);if(!str(r.name,500)||!str(r.description,2000)||!Array.isArray(r.openings)||r.openings.length>200)throw Error('관계 데이터 형식을 확인해 주세요.');for(const o of r.openings){checkId(o.id);o.image=checkButtonImage(o.image);for(const k of ['title','ko','en'])if(!str(o[k]))throw Error('퍼메 데이터 형식을 확인해 주세요.');}}
 return p;
}
try{const saved=localStorage.getItem('misel-first-message-v1');if(saved){project=validate(JSON.parse(saved));selected={relation:project.relations[0]?.id,opening:null};}}catch(e){status('자동 저장을 읽지 못했어요. 프로젝트 JSON을 불러올 수 있어요.');}
function persist(){try{validate(project);localStorage.setItem('misel-first-message-v1',JSON.stringify(project));status('설정·테마 자동 저장됨 · 프로젝트 파일로도 보관할 수 있어요.');}catch(e){status(e.message);}}
function rel(){return project.relations.find(r=>r.id===selected.relation);}
function op(){return rel()?.openings.find(o=>o.id===selected.opening);}
function field(label,path,value,type='text',attrs=''){return `<label class="field"><span>${label}</span>${type==='textarea'?`<textarea data-path="${path}" ${attrs}>${esc(value)}</textarea>`:`<input type="${type}" data-path="${path}" value="${esc(value)}" ${attrs}>`}</label>`;}
const previewImages=new Map();let pendingImageKey='';
function imageCard(title,key,data,full=false){const localKey=key==='r.image'?'relation.'+rel().id:key==='o.image'?'opening.'+op().id:key,src=previewImages.get(localKey);return `<div class="image-card"><h3>${esc(title)}</h3><div class="image-preview">${src?`<img src="${src}" alt="">`:'로컬 미리보기 없음'}</div>${field('리수 추가 에셋 이름',key+'.asset',data.asset)}${full?`<div class="grid2"><label class="field"><span>맞춤</span><select data-path="${key}.fit"><option value="cover" ${data.fit==='cover'?'selected':''}>영역 채우기</option><option value="contain" ${data.fit==='contain'?'selected':''}>전체 보이기</option></select></label><label class="field"><span>초점</span><select data-path="${key}.position"><option value="top" ${data.position==='top'?'selected':''}>위</option><option value="center" ${data.position==='center'?'selected':''}>가운데</option><option value="bottom" ${data.position==='bottom'?'selected':''}>아래</option></select></label>${field('PC 높이',key+'.height',data.height,'number','min="40" max="600"')}${field('모바일 높이',key+'.mobileHeight',data.mobileHeight,'number','min="40" max="600"')}</div>`:''}<div class="image-actions"><button data-image-pick="${localKey}">이미지 골라 미리보기</button><button data-image-clear="${localKey}">미리보기 지우기</button></div><p class="hint">파일은 미리보기 전용이에요. 리수에는 위와 같은 이름으로 추가 에셋을 등록하세요.</p></div>`;}
function buttonImageCard(title,key,data){const base=key==='r.image'?'relation.'+rel().id:'opening.'+op().id,bg=base.replace('.', '-bg.'),topSrc=previewImages.get(base),bgSrc=previewImages.get(bg);const preview=(src,empty)=>`<div class="image-preview">${src?`<img src="${src}" alt="">`:empty}</div>`;return `<div class="image-card"><h3>${esc(title)}</h3><h4>글씨 위 이미지</h4>${preview(topSrc,'로컬 미리보기 없음')}${field('위 이미지 · 리수 에셋 이름',key+'.asset',data.asset)}<div class="image-actions"><button data-image-pick="${base}">이미지 골라 미리보기</button><button data-image-clear="${base}">미리보기 지우기</button></div><h4>버튼 배경 이미지</h4>${preview(bgSrc,'로컬 배경 미리보기 없음')}${field('배경 이미지 · 리수 에셋 이름',key+'.backgroundAsset',data.backgroundAsset)}<div class="grid2"><label class="field"><span>배경 초점</span><select data-path="${key}.backgroundPosition"><option value="top" ${data.backgroundPosition==='top'?'selected':''}>위</option><option value="center" ${data.backgroundPosition==='center'?'selected':''}>가운데</option><option value="bottom" ${data.backgroundPosition==='bottom'?'selected':''}>아래</option></select></label>${field('어둡게 덮기 (%)',key+'.backgroundShade',data.backgroundShade,'number','min="0" max="100"')}</div><div class="image-actions"><button data-image-pick="${bg}">배경 골라 미리보기</button><button data-image-clear="${bg}">배경 미리보기 지우기</button></div><p class="hint">두 이미지를 모두 지정하면 버튼 배경 위에 글씨 위 이미지가 함께 보여요. 파일은 미리보기 전용이며 리수 추가 에셋 이름과 맞춰 주세요.</p></div>`;}
const foldState=new Map(),collapsedRelations=new Set();
function fold(key,title,body,open=false){const isOpen=foldState.has(key)?foldState.get(key):open;return `<details class="fold-section" data-fold="${key}" ${isOpen?'open':''}><summary>${esc(title)}</summary><div class="fold-body">${body}</div></details>`;}
function tree(){ $('#tree').innerHTML=project.relations.map(r=>`<div class="tree-group" draggable="true" data-tree-kind="relation" data-tree-id="${r.id}"><div class="tree-row"><button data-select-r="${r.id}" class="${selected.relation===r.id&&!selected.opening?'active':''}">${esc(r.name||'이름 없는 관계')}</button><button class="tree-fold" data-tree-toggle="${r.id}" title="퍼메 목록 접기/펼치기">${collapsedRelations.has(r.id)?'▸':'▾'}</button><span class="tree-grip" title="끌어서 관계 이동">⠿</span></div><div class="tree-children ${collapsedRelations.has(r.id)?'collapsed':''}">${r.openings.map(o=>`<div class="tree-row child tree-opening" draggable="true" data-tree-kind="opening" data-tree-id="${o.id}" data-parent="${r.id}"><button data-select-o="${o.id}" data-parent="${r.id}" class="${selected.opening===o.id?'active':''}">↳ ${esc(o.title||'제목 없는 퍼메')}</button><span class="tree-grip" title="끌어서 퍼메 이동">⠿</span></div>`).join('')}<div class="tree-row child"><button data-add-o="${r.id}">＋ 퍼메 추가</button></div></div></div>`).join('')||'<p class="empty">첫 관계를 추가해 주세요.</p>';}
function renderEditor(){
 document.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));
 if(tab==='content'){
 const r=rel(),o=op();
 const basic=field('프로젝트 이름','name',project.name)+`<div class="grid2">${field('호출 문구','marker',project.marker)}${field('변수 접두사','namespace',project.namespace)}</div><p class="hint">정규식이 선택기 위치를 찾는 문구예요. 본문과 겹치지 않는 특수문자 조합을 권장해요. 예: <code>⪫⩊⪪</code><br>변수 접두사는 다른 선택기와 겹치지 않게 정하세요.</p>`;
 const item=r?(o?field('버튼에 표시할 제목','o.title',o.title)+buttonImageCard('퍼메 버튼 이미지','o.image',o.image)+field('첫 메시지 본문 · 한국어 / 기본','o.ko',o.ko,'textarea','placeholder="여기에 첫 메시지를 적어 주세요."')+(project.languages?field('영어 본문 · 비워 두면 기본 본문 사용','o.en',o.en,'textarea','placeholder="비워 두면 한국어 / 기본 본문을 사용해요."'):'')+'<p class="hint">본문의 {{user}}, {{char}} 같은 CBS와 마크다운은 내보낼 때 그대로 보존돼요.</p>':field('관계 이름','r.name',r.name)+buttonImageCard('관계 버튼 이미지','r.image',r.image)+field('관계 설명','r.description',r.description,'textarea'))+`<div class="actions"><button data-item="up">↑ 위로</button><button data-item="down">↓ 아래로</button><button data-item="duplicate">복제</button><button data-item="delete" class="danger">삭제</button></div>`:'<p class="empty">왼쪽에서 관계를 추가하세요.</p>';
 $('#editor').innerHTML=fold('content-basic','프로젝트 기본 설정',basic,false)+fold('content-item',o?'선택한 퍼메 편집':r?'선택한 관계 편집':'관계·퍼메 편집',item,true);
 }else if(tab==='design'){
 const themes=`<div class="theme-grid">${Object.entries(themePresets).map(([id,t])=>`<button data-theme="${id}"><span>${t.label}</span><i style="--t-bg:${t.button};--t-accent:${t.accent};--t-border:${t.border}"></i></button>`).join('')}</div>`;
 const alignment=`${[['textAlign','제목 · 안내문 정렬'],['buttonAlign','버튼 묶음 정렬'],['buttonTextAlign','버튼 안 글자 정렬']].map(([key,label])=>`<div class="field"><span>${label}</span><div class="align-options">${[['left','왼쪽'],['center','가운데'],['right','오른쪽']].map(([value,text])=>`<button data-align="${key}" data-value="${value}" aria-pressed="${project.design[key]===value}" class="${project.design[key]===value?'active':''}">${text}</button>`).join('')}</div></div>`).join('')}<p class="hint">버튼 순서는 오른쪽 미리보기에서 끌어서 바꿀 수 있어요.</p>`;
 const colors=`<div class="grid2">${[['bg','배경색'],['text','글자색'],['accent','선택 색상'],['button','버튼 배경'],['border','테두리']].map(([k,l])=>field(l,'design.'+k,project.design[k],'color')).join('')}</div>`;
 const sizes=`<div class="grid2">${[['maxWidth','선택기 최대 가로 너비',280,1600],['radius','둥글기',0,36],['columns','PC 버튼 열 수',1,8],['mobileColumns','모바일 버튼 열 수',1,8],['mobileFontSize','모바일 글자 크기',11,24],['mobilePadding','모바일 안쪽 여백',8,40],['fontSize','글자 크기',11,24],['padding','안쪽 여백',8,40]].map(([k,l,min,max])=>field(l,'design.'+k,project.design[k],'number',`min="${min}" max="${max}"`)).join('')}</div>`;
 const labels=field('선택기 제목','title',project.title)+field('안내 문구','subtitle',project.subtitle)+field('접기 / 펼치기 버튼 문구','toggleLabel',project.toggleLabel)+`<label class="check"><input type="checkbox" data-path="useRelations" ${project.useRelations?'checked':''}> 관계 선택 단계 사용</label><p class="hint">끄면 관계 버튼을 숨기고 모든 퍼메를 한 번에 보여줘요. 왼쪽의 관계 묶음은 퍼메 정리용으로 그대로 쓸 수 있어요.</p><label class="check"><input type="checkbox" data-path="languages" ${project.languages?'checked':''}> 한국어 / 영어 선택 버튼</label><label class="check"><input type="checkbox" data-path="resetButton" ${project.resetButton?'checked':''}> 처음으로 버튼</label>`;
 $('#editor').innerHTML=`<div class="actions compact-actions"><button id="save-design">내 기본 디자인 저장</button><button id="apply-design">내 기본 디자인 적용</button></div>`+fold('design-theme','기본 테마',themes,false)+fold('design-alignment','정렬',alignment,false)+fold('design-colors','색상',colors,false)+fold('design-size','크기 · PC/모바일 배치',sizes,true)+fold('design-labels','문구 · 기능',labels,false);
 }else if(tab==='images'){
 $('#editor').innerHTML=`<p class="hint">로컬 파일은 미리보기 전용이에요. 리수 추가 에셋에는 같은 이름으로 등록하세요.</p>`+fold('image-header','선택기 상단 이미지',imageCard('상단 이미지','images.header',project.images.header,true),false)+fold('image-background','선택기 배경 이미지',imageCard('배경 이미지','images.background',project.images.background,true)+field('배경 이미지 진하기 (%)','images.background.opacity',project.images.background.opacity,'number','min="0" max="100"'),false);
 }else renderExport();
 if(tab==='design')document.querySelectorAll('[data-theme]').forEach(b=>{b.classList.toggle('active',b.dataset.theme===project.design.theme);b.setAttribute('aria-pressed',String(b.dataset.theme===project.design.theme));});
}
function styles(p,previewMode=false){const d=p.design,n=p.namespace,h=p.images.header,b=p.images.background,align={left:'flex-start',center:'center',right:'flex-end'};const mobileCSS=`.${n}{font-size:${d.mobileFontSize}px;padding:${d.mobilePadding}px}.${n} .fm-grid>button{flex-basis:calc((100% - ${(d.mobileColumns-1)*8}px) / ${d.mobileColumns})}.${n} .fm-header-image{height:${h.mobileHeight}px}.${n}::before{height:${b.mobileHeight}px}.${n} .fm-toggle-row{margin:-${d.mobilePadding}px -${d.mobilePadding}px 16px}`;return `.${n}{box-sizing:border-box;width:100%;max-width:${d.maxWidth}px;margin-left:auto;margin-right:auto;position:relative;isolation:isolate;background:${d.bg};color:${d.text};border:1px solid ${d.border};border-radius:${d.radius}px;padding:${d.padding}px;font-size:${d.fontSize}px;line-height:1.6;overflow:hidden;overflow-wrap:anywhere;text-align:${d.textAlign}}.${n}>*{position:relative;z-index:1}.${n}::before{content:"";position:absolute;z-index:0;top:0;left:0;right:0;height:${b.height}px;background-image:var(--fm-background);background-size:${b.fit};background-position:${b.position};background-repeat:no-repeat;opacity:${b.opacity/100}}.${n} .fm-toggle-row{margin:-${d.padding}px -${d.padding}px 16px;border-bottom:1px solid ${d.border};background:${d.button}}.${n}.fm-closed{padding-bottom:0}.${n}.fm-closed::before{display:none}.${n}.fm-closed .fm-toggle-row{margin-bottom:0;border-bottom:0}.${n} .fm-toggle-row button{display:block;width:100%;border:0;border-radius:0;background:transparent;text-align:center;padding:15px}.${n} .fm-header-image{display:block;width:100%;height:${h.height}px;object-fit:${h.fit};object-position:${h.position};border-radius:${Math.min(d.radius,14)}px;margin:8px 0}.${n} .fm-thumb{display:block;width:100%;height:42px;object-fit:cover;border-radius:7px;margin-bottom:6px}.${n} .fm-title{font-size:1.3em;font-weight:bold;margin:12px 0 5px}.${n} .fm-note{opacity:.75;font-size:.9em;margin:6px 0 14px}.${n} .fm-grid{display:flex;flex-wrap:wrap;justify-content:${align[d.buttonAlign]};gap:8px;margin:10px 0}.${n} .fm-grid>button{flex:0 0 calc((100% - ${(d.columns-1)*8}px) / ${d.columns});min-width:0;max-width:100%}.${n} button{box-sizing:border-box;background-color:${d.button};color:${d.text};border:1px solid ${d.border};border-radius:${Math.min(d.radius,14)}px;padding:10px 12px;font:inherit;cursor:pointer;white-space:normal;overflow-wrap:anywhere;text-align:${d.buttonTextAlign};background-size:cover;background-repeat:no-repeat}.${n} button.fm-active{background-color:${d.accent};color:${d.bg};border-color:${d.accent}}.${n} .fm-toolbar{display:flex;gap:7px;flex-wrap:wrap;align-items:center;justify-content:${align[d.buttonAlign]}}.${n} .fm-small{font-size:.8em;margin-top:16px;opacity:.7}${previewMode?(previewMobile?mobileCSS:''):`@media(max-width:600px){${mobileCSS}}`}`;}
function drawPreview(){
 validate(project);const p=project,r=p.relations.find(x=>x.id===preview.relation),o=r?.openings.find(x=>x.id===preview.opening);
 const button=(action,id,title,active,imageKey,image)=>{const src=imageKey&&previewImages.get(imageKey),bg=imageKey&&previewImages.get(imageKey.replace('.', '-bg.')),style=bg?` style="background-image:linear-gradient(rgba(0,0,0,${image.backgroundShade/100}),rgba(0,0,0,${image.backgroundShade/100})),url('${bg}');background-position:${image.backgroundPosition}"`:'';return `<button data-preview="${action}" data-id="${id}" ${['relation','opening','language'].includes(action)?`data-move="${action}" title="클릭하여 선택 · 드래그하여 순서 이동"`:""} class="${active?'fm-active':''}"${style}>${src?`<img class="fm-thumb" src="${src}" alt="">`:''}${esc(title)}</button>`;};
 const header=previewImages.get('images.header'),background=previewImages.get('images.background');
 const chooser=p.useRelations?`<div class="fm-grid">${p.relations.map(x=>button('relation',x.id,x.name,x.id===preview.relation,'relation.'+x.id,x.image)).join('')}</div>${r?`<div class="fm-note">${esc(r.description)}</div><div class="fm-grid">${r.openings.map(x=>button('opening',x.id,x.title,x.id===preview.opening,'opening.'+x.id,x.image)).join('')}</div>`:''}`:`<div class="fm-grid">${p.relations.flatMap(x=>x.openings.map(y=>button('opening',y.id,y.title,y.id===preview.opening,'opening.'+y.id,y.image))).join('')}</div>`;
 $('#preview').innerHTML=`<style>${styles(p,true)}</style><div class="${esc(p.namespace)} ${preview.closed?'fm-closed':''}" style="--fm-background:${background?`url('${background}')`:'none'}"><div class="fm-toggle-row">${button('toggle','',p.toggleLabel,false)}</div>${preview.closed?'':`${header?`<img class="fm-header-image" src="${header}" alt="">`:''}<div class="fm-title">${esc(p.title)}</div><div class="fm-note">${esc(p.subtitle)}</div>${p.languages?`<div class="fm-toolbar">${p.languageOrder.map(lang=>button('language',lang,lang==='ko'?'한국어':'English',preview.language===lang)).join('')}</div>`:''}${chooser}${p.resetButton?`<div class="fm-toolbar">${button('reset','','처음으로',false)}</div>`:''}`}</div>${o?`<div class="opening-text">${esc(p.languages&&preview.language==='en'?(o.en||o.ko):o.ko)}</div>`:''}`;
}
const when=(key,value,body)=>`{{#when::{{getvar::${key}}}::is::${value}}}${body}{{/when}}`;
const whenNot=(key,value,body)=>`{{#when::{{getvar::${key}}}::isnot::${value}}}${body}{{/when}}`;
function generate(p){
 validate(p);const n=p.namespace,key=s=>n+'_'+s,fn=s=>n+'_'+s;
 const assetImg=(asset,cls)=>asset?`<img class="${cls}" src="{{raw::${asset}}}" alt="">`:'';
 const button=(id,title,stateKey,stateValue,image)=>{const cls=stateKey?(stateKey==='language'?(stateValue==='en'?whenNot(key('language'),'ko','fm-active'):when(key('language'),'ko','fm-active')):when(key(stateKey),stateValue,'fm-active')):'',bg=image?.backgroundAsset?` style="background-image:linear-gradient(rgba(0,0,0,${image.backgroundShade/100}),rgba(0,0,0,${image.backgroundShade/100})),url('{{raw::${image.backgroundAsset}}}');background-position:${image.backgroundPosition}"`:'';return `<button class="${cls}" risu-trigger="${fn(id)}"${bg}>${assetImg(image?.asset,'fm-thumb')}${labelEsc(title)}</button>`;};
 let inner=`${assetImg(p.images.header.asset,'fm-header-image')}<div class="fm-title">${labelEsc(p.title)}</div><div class="fm-note">${labelEsc(p.subtitle)}</div>`;
 if(p.languages)inner+=`<div class="fm-toolbar">${p.languageOrder.map(lang=>button('lang_'+lang,lang==='ko'?'한국어':'English','language',lang)).join('')}</div>`;
 if(p.useRelations){inner+=`<div class="fm-grid">${p.relations.map(r=>button('rel_'+r.id,r.name,'relation',r.id,r.image)).join('')}</div>`;for(const r of p.relations)inner+=when(key('relation'),r.id,`<div class="fm-note">${labelEsc(r.description)}</div><div class="fm-grid">${r.openings.map(o=>button('open_'+o.id,o.title,'opening',o.id,o.image)).join('')}</div>`);}else inner+=`<div class="fm-grid">${p.relations.flatMap(r=>r.openings.map(o=>button('open_'+o.id,o.title,'opening',o.id,o.image))).join('')}</div>`;
 if(p.resetButton)inner+=`<div class="fm-toolbar">${button('reset','처음으로')}</div>`;
 const bg=p.images.background.asset?`url('{{raw::${p.images.background.asset}}}')`:'none';
 const html=`<style>${styles(p)}</style><div class="${n} ${when(key('closed'),'1','fm-closed')}" style="--fm-background:${bg}"><div class="fm-toggle-row">${button('toggle',p.toggleLabel)}</div>${whenNot(key('closed'),'1',inner)}</div>`;
 let body='';for(const r of p.relations)for(const o of r.openings){const text=p.languages?when(key('language'),'ko',o.ko)+whenNot(key('language'),'ko',o.en||o.ko):o.ko;body+=when(key('relation'),r.id,when(key('opening'),o.id,text))+'\n';}
 const lua=[`-- 퍼메 스튜디오 v0.9.6 | ${n}\n-- 이 선택기의 함수만 갱신하세요.\n`];
 const func=(name,lines)=>lua.push(`function ${fn(name)}(triggerId)\n${lines.map(s=>'    '+s).join('\n')}\n    reloadDisplay(triggerId)\nend\n`);
 const set=(k,v)=>`setChatVar(triggerId, "${key(k)}", "${v}")`;
 func('toggle',[`if getChatVar(triggerId, "${key('closed')}") == "1" then`, '    '+set('closed','0'),'else','    '+set('closed','1'),'end']);
 if(p.languages){func('lang_ko',[set('language','ko')]);func('lang_en',[set('language','en')]);}
 for(const r of p.relations){func('rel_'+r.id,[set('relation',r.id),set('opening','')]);for(const o of r.openings)func('open_'+o.id,[set('relation',r.id),set('opening',o.id)]);}
 if(p.resetButton)func('reset',[set('relation',''),set('opening',''),set('closed','0')]);
 const regexIn=p.marker.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 // OUT uses JavaScript replacement semantics: double every literal dollar.
 const regexOut=html.replace(/\$/g,()=> '$$');
 return {firstMessage:p.marker+'\n\n'+body,lua:lua.join('\n'),regexIn,regexOut,requestIn:regexIn,requestOut:''};
}
function regexSet(p){const out=generate(p),name=p.name||'퍼메 선택기';return {type:'regex',data:[{comment:name+' · 퍼메 디스플레이',in:out.regexIn,out:out.regexOut,type:'editdisplay',ableFlag:false,flag:'g'},{comment:name+' · 퍼메 리퀘스트 데이터',in:out.requestIn,out:'',type:'editprocess',ableFlag:false,flag:'g'}]};}
const outputs={firstMessage:'① 첫 메시지 전체',lua:'② Lua',regexIn:'③ 표시 정규식 · IN',regexOut:'③ 표시 정규식 · OUT',requestIn:'④ 리퀘스트 정규식 · IN',requestOut:'④ 리퀘스트 정규식 · OUT (빈칸)'};
const visibleOutputs={firstMessage:outputs.firstMessage,lua:outputs.lua};
function renderExport(){
 try{const out=generate(project);if(!visibleOutputs[outputKey])outputKey='firstMessage';$('#editor').innerHTML=`<div class="export-help"><ol><li>프로젝트 JSON을 먼저 저장하세요.</li><li>리수의 <b>첫 메시지</b>에 ①을 붙여넣으세요. 선택한 본문이 함께 포함돼요.</li><li><b>Lua 트리거 스크립트</b>에 ②를 추가하세요. 기존 Lua 전체를 지우지 말고 이 접두사의 함수만 교체하세요.</li><li><b>정규식 세트 저장</b>을 누른 뒤 리수의 정규식 세트 불러오기로 가져오세요.</li><li>새 채팅에서 관계 → 퍼메를 선택하고 첫 응답 전에 프롬프트를 확인하세요.</li></ol></div><p class="hint">프로젝트 수정 뒤에는 생성된 첫 메시지·Lua·정규식을 함께 갱신하세요.</p><label class="field"><span>내보낼 내용</span><select id="output-kind">${Object.entries(visibleOutputs).map(([k,v])=>`<option value="${k}" ${k===outputKey?'selected':''}>${v}</option>`).join('')}</select></label><textarea class="export-code" id="output-code" readonly spellcheck="false">${esc(out[outputKey])}</textarea><div class="actions"><button id="regex-set" class="primary">정규식 세트 저장</button><button id="copy">현재 내용 복사</button><button id="download-code">현재 파일 저장</button><button id="bundle">전체 코드 묶음 저장</button></div><p class="hint">정규식 세트에는 퍼메 디스플레이 수정과 리퀘스트 데이터 수정 2개만 들어가요. 영어 본문이 비어 있으면 기본 본문을 사용해요.</p>${fold('export-regex-out','표시 정규식 OUT · 참고용',`<textarea class="export-code" readonly spellcheck="false">${esc(out.regexOut)}</textarea>`,false)}`;}catch(e){$('#editor').innerHTML=`<p class="hint">${esc(e.message)} 내용 / 디자인 탭에서 수정해 주세요.</p>`;}
}
function render(){syncPreviewMode();tree();renderEditor();drawPreview();}
function download(name,content,type='text/plain'){const a=document.createElement('a'),url=URL.createObjectURL(new Blob([content],{type}));a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function safeName(){return project.name.replace(/[<>:"/\\|?*\x00-\x1f]/g,'_').slice(0,70)||'퍼메';}
function resetPreview(){preview={relation:null,opening:null,language:'en',closed:false};}
let treeDrag=null;
function clearTreeDrag(){document.querySelectorAll('.is-tree-dragging,.tree-drop-before,.tree-drop-after,.tree-drop-inside').forEach(el=>el.classList.remove('is-tree-dragging','tree-drop-before','tree-drop-after','tree-drop-inside'));treeDrag=null;}
$('#tree').addEventListener('dragstart',e=>{const item=e.target.closest('[data-tree-kind]');if(!item)return;treeDrag={kind:item.dataset.treeKind,id:item.dataset.treeId,parent:item.dataset.parent||''};item.classList.add('is-tree-dragging');if(e.dataTransfer){e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain','misel-tree-order');}});
$('#tree').addEventListener('dragover',e=>{if(!treeDrag)return;let target=e.target.closest('[data-tree-kind]');if(!target)return;if(treeDrag.kind==='relation'&&target.dataset.treeKind==='opening')target=target.closest('.tree-group');if(target.dataset.treeKind===treeDrag.kind&&target.dataset.treeId===treeDrag.id)return;e.preventDefault();document.querySelectorAll('.tree-drop-before,.tree-drop-after,.tree-drop-inside').forEach(el=>el.classList.remove('tree-drop-before','tree-drop-after','tree-drop-inside'));if(treeDrag.kind==='opening'&&target.dataset.treeKind==='relation'){target.classList.add('tree-drop-inside');return;}const rect=target.getBoundingClientRect();target.classList.add(e.clientY>rect.top+rect.height/2?'tree-drop-after':'tree-drop-before');});
$('#tree').addEventListener('drop',e=>{if(!treeDrag)return;let target=e.target.closest('[data-tree-kind]');if(!target){clearTreeDrag();return;}if(treeDrag.kind==='relation'&&target.dataset.treeKind==='opening')target=target.closest('.tree-group');e.preventDefault();let changed=false;
 if(target.dataset.treeKind===treeDrag.kind&&target.dataset.treeId===treeDrag.id){clearTreeDrag();tree();return;}
 if(treeDrag.kind==='relation'&&target.dataset.treeKind==='relation'&&treeDrag.id!==target.dataset.treeId){const list=project.relations,from=list.findIndex(r=>r.id===treeDrag.id),item=list.splice(from,1)[0],to=list.findIndex(r=>r.id===target.dataset.treeId),after=target.classList.contains('tree-drop-after');list.splice(to+(after?1:0),0,item);changed=true;}
 if(treeDrag.kind==='opening'){const source=project.relations.find(r=>r.id===treeDrag.parent),from=source?.openings.findIndex(o=>o.id===treeDrag.id);if(source&&from>=0){const item=source.openings.splice(from,1)[0];let destination,index;if(target.dataset.treeKind==='opening'){destination=project.relations.find(r=>r.id===target.dataset.parent);index=destination.openings.findIndex(o=>o.id===target.dataset.treeId)+(target.classList.contains('tree-drop-after')?1:0);}else{destination=project.relations.find(r=>r.id===target.dataset.treeId);index=destination.openings.length;}destination.openings.splice(index,0,item);if(selected.opening===item.id)selected.relation=destination.id;if(preview.opening===item.id)preview.relation=destination.id;changed=source!==destination||from!==index;}}
 clearTreeDrag();if(changed){persist();render();status('이야기 구성 순서를 바꿨어요. 퍼메 연결도 함께 이동했어요.');}else tree();});
$('#tree').addEventListener('dragend',clearTreeDrag);
// Movement changes stable-ID arrays; selected scenes and Lua targets stay attached.
function moveButton(kind,fromId,toId,after){
 if(kind==='opening'&&!project.useRelations){const source=project.relations.find(r=>r.openings.some(o=>o.id===fromId)),destination=project.relations.find(r=>r.openings.some(o=>o.id===toId));if(!source||!destination||fromId===toId)return false;const from=source.openings.findIndex(o=>o.id===fromId),item=source.openings.splice(from,1)[0],target=destination.openings.findIndex(o=>o.id===toId);destination.openings.splice(target+(after?1:0),0,item);preview.relation=destination.id;persist();tree();drawPreview();if(tab==='export')renderExport();status('버튼 위치를 바꿨어요 · 관계 묶음과 내보내기에도 반영돼요.');return true;}
 const list=kind==='relation'?project.relations:kind==='opening'?project.relations.find(r=>r.id===preview.relation)?.openings:kind==='language'?project.languageOrder:null;
 if(!list||fromId===toId)return false;
 const id=item=>typeof item==='string'?item:item.id;
 const from=list.findIndex(item=>id(item)===fromId),to=list.findIndex(item=>id(item)===toId);
 if(from<0||to<0)return false;
 const original=list.map(id).join(',');const [item]=list.splice(from,1);
 const target=list.findIndex(item=>id(item)===toId);list.splice(target+(after?1:0),0,item);
 if(list.map(id).join(',')===original)return false;
 persist();tree();drawPreview();if(tab==='export')renderExport();
 status('버튼 위치를 바꿨어요 · 저장과 내보내기에도 반영돼요.');return true;
}
let buttonDrag=null,suppressDragClickUntil=0;
function clearDrag(){
 if(buttonDrag?.ghost)buttonDrag.ghost.remove();
 document.querySelectorAll('.is-dragging,.drop-before,.drop-after').forEach(el=>el.classList.remove('is-dragging','drop-before','drop-after'));
 buttonDrag=null;
}
$('#preview').addEventListener('pointerdown',e=>{
 const b=e.target.closest('[data-move]');if(!b||e.button!==0||buttonDrag)return;
 buttonDrag={button:b,pointerId:e.pointerId,kind:b.dataset.move,id:b.dataset.id,x:e.clientX,y:e.clientY,active:false,target:null,after:false};
 try{b.setPointerCapture(e.pointerId);}catch{}
});
document.addEventListener('pointermove',e=>{
 const drag=buttonDrag;if(!drag||e.pointerId!==drag.pointerId)return;
 if(!drag.active&&Math.hypot(e.clientX-drag.x,e.clientY-drag.y)<6)return;
 e.preventDefault();
 if(!drag.active){drag.active=true;drag.button.classList.add('is-dragging');drag.ghost=document.createElement('div');drag.ghost.className='button-drag-ghost';drag.ghost.textContent=drag.button.textContent;document.body.appendChild(drag.ghost);}
 drag.ghost.style.left=(e.clientX+14)+'px';drag.ghost.style.top=(e.clientY+14)+'px';
 document.querySelectorAll('.drop-before,.drop-after').forEach(el=>el.classList.remove('drop-before','drop-after'));
 const target=document.elementFromPoint(e.clientX,e.clientY)?.closest('#preview [data-move]');
 drag.target=null;
 if(target&&target!==drag.button&&target.dataset.move===drag.kind){const rect=target.getBoundingClientRect();drag.after=e.clientX>rect.left+rect.width/2;drag.target=target;target.classList.add(drag.after?'drop-after':'drop-before');}
},{passive:false});
document.addEventListener('pointerup',e=>{
 const drag=buttonDrag;if(!drag||e.pointerId!==drag.pointerId)return;
 const target=drag.target?.dataset.id,after=drag.after;
 if(drag.active){e.preventDefault();suppressDragClickUntil=performance.now()+300;}
 try{drag.button.releasePointerCapture(e.pointerId);}catch{}
 clearDrag();if(drag.active&&target)moveButton(drag.kind,drag.id,target,after);
});
document.addEventListener('pointercancel',()=>{if(buttonDrag?.active)suppressDragClickUntil=performance.now()+300;clearDrag();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&buttonDrag){suppressDragClickUntil=performance.now()+300;clearDrag();}});
window.addEventListener('blur',clearDrag);
document.addEventListener('click',e=>{if(performance.now()<suppressDragClickUntil&&e.detail!==0&&e.target.closest('#preview')){e.preventDefault();e.stopImmediatePropagation();}},true);
document.addEventListener('input',e=>{
 const el=e.target,path=el.dataset.path;if(!path)return;
 let target=project,parts=path.split('.');if(parts[0]==='r'){target=rel();parts.shift();}else if(parts[0]==='o'){target=op();parts.shift();}
 if(!target)return;while(parts.length>1){target=target[parts.shift()];if(!target)return;}target[parts[0]]=el.type==='checkbox'?el.checked:el.type==='number'?Number(el.value):el.value;
 if(el.type==='color'){project.design.theme='custom';document.querySelectorAll('[data-theme]').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false');});}
 persist();tree();try{validate(project);drawPreview();}catch{}
});
document.addEventListener('change',e=>{if(e.target.id==='output-kind'){outputKey=e.target.value;renderExport();}});
document.addEventListener('toggle',e=>{if(e.target.matches?.('[data-fold]'))foldState.set(e.target.dataset.fold,e.target.open);},true);
document.addEventListener('click',async e=>{
 const b=e.target.closest('button');if(!b)return;
 if(b.dataset.treeToggle){const id=b.dataset.treeToggle;collapsedRelations.has(id)?collapsedRelations.delete(id):collapsedRelations.add(id);tree();return;}
 if(b.dataset.imagePick){pendingImageKey=b.dataset.imagePick;$('#image-file').click();return;}
 if(b.dataset.imageClear){const old=previewImages.get(b.dataset.imageClear);if(old)URL.revokeObjectURL(old);previewImages.delete(b.dataset.imageClear);renderEditor();drawPreview();status('로컬 미리보기를 지웠어요. 에셋 이름은 유지돼요.');return;}
 if(b.dataset.align){project.design[b.dataset.align]=b.dataset.value;persist();render();return;}
 if(b.dataset.tab){tab=b.dataset.tab;renderEditor();return;}
 if(b.dataset.selectR){selected={relation:b.dataset.selectR,opening:null};tab='content';render();return;}
 if(b.dataset.selectO){selected={relation:b.dataset.parent,opening:b.dataset.selectO};tab='content';render();return;}
 if(b.dataset.addO){const r=project.relations.find(x=>x.id===b.dataset.addO);const o=opening();r.openings.push(o);selected={relation:r.id,opening:o.id};tab='content';persist();render();return;}
 if(b.dataset.item){const r=rel(),o=op(),list=o?r.openings:project.relations,item=o||r;if(!item)return;const i=list.indexOf(item),action=b.dataset.item;
 if(action==='delete'){if(!confirm(`「${o?o.title:r.name}」\n이 항목${o?'':'과 아래 퍼메들'}을 삭제할까요?`))return;list.splice(i,1);selected=o?{relation:r.id,opening:null}:{relation:project.relations[0]?.id,opening:null};}
 if(action==='duplicate'){const c=JSON.parse(JSON.stringify(item));c.id=uid();if(o)c.title+=' (복사)';else{c.name+=' (복사)';c.openings.forEach(x=>x.id=uid());}list.splice(i+1,0,c);selected=o?{relation:r.id,opening:c.id}:{relation:c.id,opening:null};}
 if(action==='up'&&i>0)[list[i-1],list[i]]=[list[i],list[i-1]];
 if(action==='down'&&i<list.length-1)[list[i+1],list[i]]=[list[i],list[i+1]];
 resetPreview();persist();render();return;}
 if(b.dataset.theme){const theme=themePresets[b.dataset.theme];if(!theme)return;for(const key of ['bg','text','accent','button','border'])project.design[key]=theme[key];project.design.theme=b.dataset.theme;persist();render();return;}
 if(b.dataset.preview){const a=b.dataset.preview;if(a==='toggle')preview.closed=!preview.closed;if(a==='language')preview.language=b.dataset.id;if(a==='relation'){preview.relation=b.dataset.id;preview.opening=null;}if(a==='opening'){preview.opening=b.dataset.id;preview.relation=project.relations.find(r=>r.openings.some(o=>o.id===b.dataset.id))?.id||null;}if(a==='reset'){preview.relation=null;preview.opening=null;preview.closed=false;}drawPreview();return;}
 if(b.id==='add-relation'){const r={id:uid(),name:'새 관계',description:'',image:buttonImageDefault(),openings:[]};project.relations.push(r);selected={relation:r.id,opening:null};tab='content';persist();render();}
 if(b.id==='new'){if(!confirm('새 프로젝트로 바꿀까요? 저장하지 않은 현재 내용은 브라우저 자동 저장에서 교체돼요.'))return;project=starter();selected={relation:null,opening:null};resetPreview();tab='content';persist();render();}
 if(b.id==='save-design'){try{validate(project);localStorage.setItem('misel-first-message-design',JSON.stringify(project.design));status('내 기본 디자인을 저장했어요. 다른 프로젝트에서도 적용할 수 있어요.');}catch(err){status('디자인 저장 실패: '+err.message);}return;}
 if(b.id==='apply-design'){try{const saved=localStorage.getItem('misel-first-message-design');if(!saved){status('저장한 기본 디자인이 없어요. 먼저 내 기본 디자인 저장을 눌러 주세요.');return;}const candidate=JSON.parse(JSON.stringify(project));candidate.design=JSON.parse(saved);validate(candidate);project.design=candidate.design;persist();render();status('내 기본 디자인을 적용했어요.');}catch(err){status('디자인 적용 실패: '+err.message);}return;}
 if(b.id==='save'){try{validate(project);download(safeName()+'.project.json',JSON.stringify(project,null,2),'application/json');status('프로젝트 파일을 저장했어요. 불러오기로 계속 수정할 수 있어요.');}catch(err){status(err.message);}}
 if(b.id==='load')$('#file').click();
 if(b.id==='width'){previewMobile=!previewMobile;try{localStorage.setItem('misel-first-message-preview',previewMobile?'mobile':'desktop');}catch{}syncPreviewMode();drawPreview();}
 if(b.id==='copy'){const area=$('#output-code');try{await navigator.clipboard.writeText(area.value);status('클립보드에 복사했어요.');}catch{area.focus();area.select();status(document.execCommand('copy')?'클립보드에 복사했어요.':'선택된 내용을 Ctrl+C로 복사해 주세요.');}}
 if(b.id==='download-code'){const out=generate(project);download(safeName()+'.'+outputKey+(outputKey==='lua'?'.lua':'.txt'),out[outputKey]);}
 if(b.id==='bundle'){const out=generate(project);download(safeName()+'.export.txt',Object.entries(outputs).map(([k,l])=>`===== ${l} =====\n${out[k]}\n`).join('\n'));}
 if(b.id==='regex-set'){download(safeName()+'.regex.json',JSON.stringify(regexSet(project),null,2),'application/json');status('리수에서 불러올 정규식 세트를 저장했어요.');}
});
$('#file').addEventListener('change',async e=>{const f=e.target.files[0];if(!f)return;try{if(f.size>10000000)throw Error('프로젝트 파일은 10MB 이내로 골라 주세요.');const next=validate(JSON.parse(await f.text()));if(!confirm('현재 편집 내용을 불러온 프로젝트로 바꿀까요?'))return;project=next;selected={relation:project.relations[0]?.id,opening:null};resetPreview();tab='content';persist();render();status('프로젝트를 불러왔어요. 이어서 수정하세요.');}catch(err){status('불러오기 실패: '+err.message);}finally{e.target.value='';}});
$('#image-file').addEventListener('change',e=>{const f=e.target.files[0],key=pendingImageKey;if(!f||!key)return;if(!f.type.startsWith('image/')){status('이미지 파일을 골라 주세요.');e.target.value='';return;}if(f.size>20*1024*1024){status('미리보기 이미지는 20MB 이내로 골라 주세요.');e.target.value='';return;}const old=previewImages.get(key);if(old)URL.revokeObjectURL(old);previewImages.set(key,URL.createObjectURL(f));e.target.value='';renderEditor();drawPreview();status('로컬 미리보기를 연결했어요. 리수 에셋 이름도 입력해 주세요.');});
render();
window.FirstMessageBuilder={generate,regexSet,validate,demo,starter};
