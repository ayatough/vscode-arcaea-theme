const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const yaml_files = [path.join(__dirname, "../src", "arcaea_hikari.yaml"),
                    path.join(__dirname, "../src", "arcaea_tairitsu.yaml")];
const publish_files = [path.join(__dirname, "../themes", "arcaea-hikari-color-theme.json"),
                       path.join(__dirname, "../themes", "arcaea-tairitsu-color-theme.json")];

const decode_alpha = new yaml.Type('!alpha', {
    kind: 'sequence',
    construct: ([hex, alpha]) => hex + alpha,
    represent: ([hex, alpha]) => hex + alpha,
});

const schema = yaml.Schema.create([decode_alpha]);

for (const i in [0, 1]) {
    fs.readFile(yaml_files[i], 'utf-8', (err, data) => {
        if (!!err) console.log(err);
        const base = yaml.load(data, {schema});
        fs.writeFile(publish_files[i], JSON.stringify(base, null, 2), err => {
            if (!!err) console.log(err);
        });
    });
}

