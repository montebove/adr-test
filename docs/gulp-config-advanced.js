module.exports = (cfg) => {
  const enrich = require('./gulp/utils/markdown').enricher(cfg);
  // Merge advanced configuration
  Object.assign(cfg, {
    enrich: enrich,
    tocs: {
      status: {
        filename: cfg.adrByStatus,
        title: 'Indice ADR per Status'
      },
      tags: {
        filename: cfg.adrByTags,
        title: 'Indice ADR per Tag'
      },
      markers: {
        filename: cfg.adrByMarkers,
        title: 'Indice ADR per Marker'
      }
    },
    topics: {
      title: {
        regex: /^#\s+(.*?)\s*$/m,
        capture: args => args[1],
        replace: undefined
      },
      status: {
        regex: /[\r\n]##\s+Status[ \t]*[\r\n]\s*(.*)/,
        capture: args => args[1],
        replace: args => `\n## Status\n\n${enrich('status', args[1].trim(), true)}\n\n`,
        renderer: {
          Accepted: (v) =>  `✔️ ${v}`,
          Rejected: (v) => `❌ ${v}`,
          Proposed: (v) => `❔ ${v}`,
          Deprecated: (v) => `✖️ ${v}`
        }
      },
      tags: {
        regex: /[\r\n]##\s+Tags[ \t]*[\r\n]*([\s\S]+?)[\r\n]##/,
        capture: args => args[1].replace(/(?:[\r\n]|\s*,\s*)+/g, ',').split(',').filter(t => t),
        // capture: args => args[1].replace(/[\r\n]+/g, ',').replace(/(\s*,\s*)+/g, ',').split(',').filter(t => t),
        replace: args => {
          const mdFile = args.pop();
          const adrTags = mdFile.tags.map(t => enrich('tags', t, true, true)).join(' ');
          return `\n\n## Tags\n\n${adrTags}\n\n##`;
        },
        renderer: undefined // Same as identity v => v
      }
      //
      // Markers are added here by the code below.
      // Their key is 'markers.x' where x identifies  the specific marker.
      //
    }
  });

  // Add markers to config
  const captureMarker = args => {
    let mdFile = args[args.length - 1];
    mdFile.markers = mdFile.markers || [];
    mdFile.markers.push(args[1]);
    return mdFile.markers;
  };
  const replaceMarker = args => enrich(`markers.${args[1]}`, args[1], true);
  const markers = {
    // Feel free to add/remove markers
    'ℹ️': 'Info',
    '📌': 'Open Point',
    '📝': 'Nota',
    '⚠️': 'Warning',
    '🐧': 'Tip',
    '💡': 'Suggerimento',
    '👍': 'Pro',
    '👎': 'Contro',
    '🚧': 'Work in Progress',
    '📖': 'Citazione',
    '👀': 'Careful'
  };
  Object.keys(markers).forEach(m => cfg.topics[`markers.${m}`] = {
    regex: m,  // The string 'x' is converted to the regex /(x)/g
    capture: captureMarker,
    replace: replaceMarker,
    renderer: v => `${v} __${markers[m]}__\n`
  },);

  return cfg;
};
