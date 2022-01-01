/*
 * Copyright (C) 2017  luffah<contact@luffah.xyz>
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
const fs = require('fs')
const postcss = require('postcss')
var postcss_plugins = [
  require('autoprefixer'),
  require('cssnano')
]

var args = process.argv.slice(2)

if (args.length == 2) {
  var sourcecss = args[0]
  var targetcss = args[1]
  fs.readFile(sourcecss, (err, data) => {
    postcss(postcss_plugins)
      .process(data, { from: sourcecss, to: targetcss })
      .then(result => {
        fs.writeFile(targetcss, result.css, () => true)
        if (result.map) fs.writeFile(targetcss + '.map', result.map, () => true)
      })
  })
}
