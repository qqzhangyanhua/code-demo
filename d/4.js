const scriptTypesRE = /<script\s+type="module"\s+src="(.+?)">/;
const html =' <script type="module" src="/src/main.js"></script>'
console.log(html.match(scriptTypesRE));
