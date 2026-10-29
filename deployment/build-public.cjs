const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),out=path.join(root,'public');
fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
for(const name of fs.readdirSync(root)){
 if(/^(?:index\.html|CNAME|favicon\.(?:ico|svg)|apple-touch-icon\.png|portfolio-[\w-]+\.css|origami-components\.css|portfolio\.bundle\.js|origami-components\.bundle\.js|portfolio-(?:data|spend-data|origami-data|api-config)\.js|origami-component-assets\.js)$/.test(name))fs.copyFileSync(path.join(root,name),path.join(out,name));
}
for(const name of ['images','fonts','downloads','prototypes'])fs.cpSync(path.join(root,name),path.join(out,name),{recursive:true});
fs.mkdirSync(path.join(out,'vendor'));for(const name of ['react.min.js','react-dom.min.js'])fs.copyFileSync(path.join(root,'vendor',name),path.join(out,'vendor',name));
