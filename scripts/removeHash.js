const path = require('path');
const fs = require('fs');

const distPath = path.resolve(__dirname, '..', 'dist');

//          $1                                                                $2
// matches (atleast one non period, period), atleast one non period, period, (atleast one charatcer)
const hashMatch = /^([^.]+\.)[^.]+\.(.+)$/;

// go through all files in dist and remove hashes
// requires only single js/css files so no name collisions
fs.readdirSync(distPath)
    .filter(x => x.match(hashMatch))
    .forEach((file) => {
        const withHash = path.resolve(distPath, file);
        const withoutHash = path.resolve(distPath, file.replace(hashMatch, '$1$2'));
        fs.renameSync(withHash, withoutHash);
    });

//          $1            $2                                                                      $3
// matches (src or href) (=" , atleast one non period, period) atleast one non period, period, , (atleast one non ", ")
const linkMatch = /(src|href)(="\/[^.]+\.)[^.]+\.([^"]+")/g;

// go through index.html and replace hashes for local pointing files for running locally
const indexPath = path.join(distPath, 'index.html');
const data = fs.readFileSync(indexPath, 'utf8');
const withoutHash = data.replace(linkMatch, '$1$2$3');

fs.writeFileSync(indexPath, withoutHash, 'utf8');
