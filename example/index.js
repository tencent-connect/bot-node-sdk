// 以下仅为用法示意，详情请参照文档：https://bot.q.qq.com/wiki/develop/nodesdk/

const testConfigWs = {
  appID: '',
  token: '',
};

const arkData42 = {
  "ark": {
    "template_id": 42,
    "kv": [{
        "key": "#PROMPT#",
        "value": "消息提示信息"
      },
      {
        "key": "#VERSION#",
        "value": "1.0.0.8"
      },
      {
        "key": "#MESSAGE#",
        "obj": [{
            "obj_kv": [{
                "key": "fontSize",
                "value": "large"
              },
              {
                "key": "fontWeight",
                "value": "bold"
              },
              {
                "key": "color",
                "value": "purple"
              },
              {
                "key": "value",
                "value": "#机器人使用指南#"
              }
            ]
          },
          {
            "obj_kv": [{
                "key": "fontSize",
                "value": "normal"
              },
              {
                "key": "fontWeight",
                "value": "bold"
              },
              {
                "key": "color",
                "value": "pink"
              },
              {
                "key": "value",
                "value": "问：如何撤回消息？"
              }
            ]
          },
          {
            "obj_kv": [{
                "key": "fontSize",
                "value": "normal"
              },
              {
                "key": "fontWeight",
                "value": "normal"
              },
              {
                "key": "color",
                "value": "gray"
              },
              {
                "key": "value",
                "value": "最后更新于2021/12/110"
              }
            ]
          }
        ]
      }
    ]
  }
}

const arkData43 = {
  "ark": {
    "template_id": 43,
    "kv": [{
        "key": "#PROMPT#",
        "value": "promptaaaa"
      },
      {
        "key": "#TITLE#",
        "value": "标题111"
      },
      {
        "key": "#DESC#",
        "value": "描述1"
      },
      {
        "key": "#LIST#",
        "obj": [{
            "obj_kv": [{
              "key": "value",
              "value": "eStar11"
            }]
          },
          {
            "obj_kv": [{
              "key": "value",
              "value": "AG超玩会"
            }]
          },
          {
            "obj_kv": [{
              "key": "value",
              "value": "QGhappy"
            }]
          },
          {
            "obj_kv": [{
              "key": "value",
              "value": "RNGM"
            }]
          }
        ]
      }
    ]
  }
}


const client = createOpenAPI(testConfigWs);

const testArk = () => {
  // 传入频道ID
  client.messageApi.postMessage('', arkData43).then((res) => {
    console.log('arkdata', res);
  }).catch((e) => {
    console.log(e);
  });
  console.log('Date', Date.now());
}

const ws = createWebsocket(testConfigWs);
ws.on('READY', (wsdata) => {
  console.log('[READY] 事件接收 :', wsdata);
});

ws.on('ERROR', (data) => {
  console.log('[ERROR] 事件接收 :', data);
});
ws.on('GUILDS', (data) => {
  console.log('[GUILDS] 事件接收 :', data);
});
ws.on('GUILGUILD_MEMBERSDS', (data) => {
  console.log('[GUILGUILD_MEMBERSDS] 事件接收 :', data);
});
ws.on('DIRECT_MESSAGE', (data) => {
  console.log('[DIRECT_MESSAGE] 事件接收 :', data);
});
ws.on('AUDIO_ACTION', (data) => {
  console.log('[AUDIO_ACTION] 事件接收 :', data);
});
ws.on('AT_MESSAGES', (data) => {
  console.log('[AT_MESSAGES] 事件接收 :', data);
  const {
    content
  } = data.msg;
  const s = content.split(' ')[1];
  if (s === 'ark') {
    testArk();
  }
});

// client.guildApi.guild('').then((data) => {
//   console.log(data);
// });

// // ✅
// client.channelApi.channels(guildID).then((res) => {
//   console.log(res.data);
// });
