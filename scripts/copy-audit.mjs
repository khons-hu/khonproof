import {readdir,readFile} from 'node:fs/promises';
import {resolve,relative,extname} from 'node:path';

const failOnFindings=process.argv.includes('--fail');
const roots=process.argv.slice(2).filter(arg=>arg!=='--fail');
if(!roots.length)throw Error('Usage: npm run copy-audit -- <public-project-dir> [...]');
const sourceExtensions=new Set(['.html','.js','.mjs','.ts','.tsx','.md']);
const ignored=new Set(['node_modules','.git','dist','.next','.vercel','vendor','reports','.godot']);
const patterns=[
	{label:'generic hype',re:/\b(revolutionary|game[- ]changing|best[- ]in[- ]class|cutting[- ]edge|unprecedented)\b/gi},
	{label:'empty announcement',re:/\b(we(?:’|')re excited|thrilled to announce|delighted to share)\b/gi},
	{label:'stock promise',re:/\b(unlock the power|take (?:your|it) .* to the next level|a new era of)\b/gi}
];
const files=[];
async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const path=resolve(dir,entry.name);if(entry.isDirectory()){if(!ignored.has(entry.name))await walk(path);}else if(sourceExtensions.has(extname(entry.name)))files.push(path);}}
for(const root of roots)await walk(resolve(root));
const findings=[];
for(const file of files){const text=await readFile(file,'utf8');for(const rule of patterns){for(const match of text.matchAll(rule.re)){const line=text.slice(0,match.index).split('\n').length;findings.push({file:relative(process.cwd(),file),line,rule:rule.label,match:match[0]});}}}
const report={version:1,kind:'copy-audit',scope:'Static screen for stock marketing language in public source copy. Findings prompt a human review. It does not judge authorship, factual accuracy, accessibility wording, or technical guarantees.',files:files.length,findings};
console.log(JSON.stringify(report,null,2));
process.exitCode=failOnFindings&&findings.length?1:0;
