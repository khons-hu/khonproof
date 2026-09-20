import {cp,mkdir,rm} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});await cp('public','dist',{recursive:true});await cp('lib','dist/lib',{recursive:true});console.log('Static build ready. No API credentials or local reports included.');
