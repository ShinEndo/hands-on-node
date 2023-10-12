await fs.promises.mkdir('todos');

const todo1 = JSON.stringify({ id: 1, title: 'ネーム', completed: false });

await fs.promises.writeFile('todos/1.json', todo1);

await fs.promises.readdir('todos');

await fs.promises.readFile('todos/1.json');

await fs.promises.readFile('todos/1.json', 'utf8');

require('./todos/1.json');

await fs.promises.writeFile('todos/1.json', '{}');

require('./todos/1.json');

delete require.cache[require.resolve('./todos/1.json')];

require('./todos/1.json');

await fs.promises.unlink('todos/1.json');

await fs.promises.readdir('todos');

await fs.promises.rmdir('todos');

const filePath = 'path/to/file.txt';

path.dirname(filePath);

path.basename(filePath);

path.extname(filePath);

path.parse(filePath);

path.join('path1', 'path2');

path.join('foo/bar', '..', '/baz', 'file.txt');

require('isomorphic-fetch');

const baseUrl = 'http://localhost:3000/api/todos';

await fetch(baseUrl);

console.log(_.status, await _.json());

.edit
for(const title of ['ネーム','下書き']) {
    console.log(JSON.stringify({title}));
    const res = await fetch(baseUrl,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
    });
    console.log(res.status, await res.json());
}

(await fetch(baseUrl,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
})).status;

await fetch(baseUrl).then(res => res.json());

