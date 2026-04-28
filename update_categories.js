const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const order = [
  'pronouns', 'numbers', 'time', 'relations', 'body', 'verbs',
  'emotions', 'home', 'clothes', 'restaurant', 'transport',
  'hobbies', 'jobs', 'nature', 'colors', 'directions', 'weather'
];

const newCats = {
  en: {
    body: `{id:'body',name:'身体与健康',subgroups:[{label:null,items:[{w:'head',t:'头'},{w:'eye',t:'眼睛'},{w:'ear',t:'耳朵'},{w:'mouth',t:'嘴'},{w:'nose',t:'鼻子'},{w:'face',t:'脸'},{w:'hand',t:'手'},{w:'arm',t:'手臂'},{w:'leg',t:'腿'},{w:'foot',t:'脚'},{w:'body',t:'身体'},{w:'hair',t:'头发'},{w:'doctor',t:'医生'},{w:'medicine',t:'药'},{w:'pain',t:'痛'}]}]}`,
    clothes: `{id:'clothes',name:'衣物与穿搭',subgroups:[{label:null,items:[{w:'clothes',t:'衣服'},{w:'shirt',t:'衬衫'},{w:'t-shirt',t:'T恤'},{w:'pants',t:'裤子'},{w:'dress',t:'连衣裙'},{w:'skirt',t:'裙子'},{w:'jacket',t:'夹克'},{w:'coat',t:'外套'},{w:'shoe',t:'鞋'},{w:'hat',t:'帽子'},{w:'sock',t:'袜子'},{w:'bag',t:'包'},{w:'glasses',t:'眼镜'},{w:'belt',t:'皮带'},{w:'ring',t:'戒指'}]}]}`,
    nature: `{id:'nature',name:'大自然与动物',subgroups:[{label:null,items:[{w:'dog',t:'狗'},{w:'cat',t:'猫'},{w:'bird',t:'鸟'},{w:'fish',t:'鱼'},{w:'horse',t:'马'},{w:'tree',t:'树'},{w:'flower',t:'花'},{w:'grass',t:'草'},{w:'mountain',t:'山'},{w:'river',t:'河'},{w:'sea',t:'海'},{w:'sky',t:'天空'},{w:'sun',t:'太阳'},{w:'moon',t:'月亮'},{w:'star',t:'星星'}]}]}`,
    jobs: `{id:'jobs',name:'职业与身份',subgroups:[{label:null,items:[{w:'police',t:'警察'},{w:'worker',t:'工人'},{w:'driver',t:'司机'},{w:'boss',t:'老板'},{w:'staff',t:'员工'},{w:'farmer',t:'农夫'},{w:'cook',t:'厨师'},{w:'artist',t:'艺术家'},{w:'singer',t:'歌手'},{w:'actor',t:'演员'},{w:'writer',t:'作家'},{w:'nurse',t:'护士'},{w:'manager',t:'经理'},{w:'pilot',t:'飞行员'},{w:'engineer',t:'工程师'}]}]}`
  },
  es: {
    body: `{id:'body',name:'Cuerpo 身体',subgroups:[{label:null,items:[{w:'cabeza',t:'头'},{w:'ojo',t:'眼睛'},{w:'oreja',t:'耳朵'},{w:'boca',t:'嘴'},{w:'nariz',t:'鼻子'},{w:'cara',t:'脸'},{w:'mano',t:'手'},{w:'brazo',t:'手臂'},{w:'pierna',t:'腿'},{w:'pie',t:'脚'},{w:'cuerpo',t:'身体'},{w:'pelo',t:'头发'},{w:'médico',t:'医生'},{w:'medicina',t:'药'},{w:'dolor',t:'痛'}]}]}`,
    clothes: `{id:'clothes',name:'Ropa 衣物',subgroups:[{label:null,items:[{w:'ropa',t:'衣服'},{w:'camisa',t:'衬衫'},{w:'camiseta',t:'T恤'},{w:'pantalones',t:'裤子'},{w:'vestido',t:'连衣裙'},{w:'falda',t:'裙子'},{w:'chaqueta',t:'夹克'},{w:'abrigo',t:'外套'},{w:'zapato',t:'鞋'},{w:'sombrero',t:'帽子'},{w:'calcetín',t:'袜子'},{w:'bolso',t:'包'},{w:'gafas',t:'眼镜'},{w:'cinturón',t:'皮带'},{w:'anillo',t:'戒指'}]}]}`,
    nature: `{id:'nature',name:'Naturaleza 自然',subgroups:[{label:null,items:[{w:'perro',t:'狗'},{w:'gato',t:'猫'},{w:'pájaro',t:'鸟'},{w:'pez',t:'鱼'},{w:'caballo',t:'马'},{w:'árbol',t:'树'},{w:'flor',t:'花'},{w:'hierba',t:'草'},{w:'montaña',t:'山'},{w:'río',t:'河'},{w:'mar',t:'海'},{w:'cielo',t:'天空'},{w:'sol',t:'太阳'},{w:'luna',t:'月亮'},{w:'estrella',t:'星星'}]}]}`,
    jobs: `{id:'jobs',name:'Trabajos 职业',subgroups:[{label:null,items:[{w:'policía',t:'警察'},{w:'trabajador',t:'工人'},{w:'conductor',t:'司机'},{w:'jefe',t:'老板'},{w:'empleado',t:'员工'},{w:'granjero',t:'农夫'},{w:'cocinero',t:'厨师'},{w:'artista',t:'艺术家'},{w:'cantante',t:'歌手'},{w:'actor',t:'演员'},{w:'escritor',t:'作家'},{w:'enfermera',t:'护士'},{w:'gerente',t:'经理'},{w:'piloto',t:'飞行员'},{w:'ingeniero',t:'工程师'}]}]}`
  },
  kr: {
    body: `{id:'body',name:'몸 身体',subgroups:[{label:null,items:[{w:'머리',t:'头'},{w:'눈',t:'眼睛'},{w:'귀',t:'耳朵'},{w:'입',t:'嘴'},{w:'코',t:'鼻子'},{w:'얼굴',t:'脸'},{w:'손',t:'手'},{w:'팔',t:'手臂'},{w:'다리',t:'腿'},{w:'발',t:'脚'},{w:'몸',t:'身体'},{w:'머리카락',t:'头发'},{w:'의사',t:'医生'},{w:'약',t:'药'},{w:'아픔',t:'痛'}]}]}`,
    clothes: `{id:'clothes',name:'옷 衣物',subgroups:[{label:null,items:[{w:'옷',t:'衣服'},{w:'셔츠',t:'衬衫'},{w:'티셔츠',t:'T恤'},{w:'바지',t:'裤子'},{w:'원피스',t:'连衣裙'},{w:'치마',t:'裙子'},{w:'재킷',t:'夹克'},{w:'코트',t:'外套'},{w:'신발',t:'鞋'},{w:'모자',t:'帽子'},{w:'양말',t:'袜子'},{w:'가방',t:'包'},{w:'안경',t:'眼镜'},{w:'벨트',t:'皮带'},{w:'반지',t:'戒指'}]}]}`,
    nature: `{id:'nature',name:'자연 自然',subgroups:[{label:null,items:[{w:'개',t:'狗'},{w:'고양이',t:'猫'},{w:'새',t:'鸟'},{w:'물고기',t:'鱼'},{w:'말',t:'马'},{w:'나무',t:'树'},{w:'꽃',t:'花'},{w:'풀',t:'草'},{w:'산',t:'山'},{w:'강',t:'河'},{w:'바다',t:'海'},{w:'하늘',t:'天空'},{w:'태양',t:'太阳'},{w:'달',t:'月亮'},{w:'별',t:'星星'}]}]}`,
    jobs: `{id:'jobs',name:'직업 职业',subgroups:[{label:null,items:[{w:'경찰',t:'警察'},{w:'노동자',t:'工人'},{w:'운전사',t:'司机'},{w:'사장',t:'老板'},{w:'직원',t:'员工'},{w:'농부',t:'农夫'},{w:'요리사',t:'厨师'},{w:'예술가',t:'艺术家'},{w:'가수',t:'歌手'},{w:'배우',t:'演员'},{w:'작가',t:'作家'},{w:'간호사',t:'护士'},{w:'매니저',t:'经理'},{w:'조종사',t:'飞行员'},{w:'엔지니어',t:'工程师'}]}]}`
  },
  yue: {
    body: `{id:'body',name:'身體',subgroups:[{label:null,items:[{w:'頭',t:'头'},{w:'眼',t:'眼睛'},{w:'耳仔',t:'耳朵'},{w:'口',t:'嘴'},{w:'鼻',t:'鼻子'},{w:'面',t:'脸'},{w:'手',t:'手'},{w:'手臂',t:'手臂'},{w:'腳',t:'脚'},{w:'腳板',t:'脚掌'},{w:'身體',t:'身体'},{w:'頭髮',t:'头发'},{w:'醫生',t:'医生'},{w:'藥',t:'药'},{w:'痛',t:'痛'}]}]}`,
    clothes: `{id:'clothes',name:'衣著',subgroups:[{label:null,items:[{w:'衫',t:'衣服'},{w:'恤衫',t:'衬衫'},{w:'T裇',t:'T恤'},{w:'褲',t:'裤子'},{w:'裙',t:'裙'},{w:'半截裙',t:'半身裙'},{w:'褸',t:'夹克/外套'},{w:'大褸',t:'大衣'},{w:'鞋',t:'鞋'},{w:'帽',t:'帽子'},{w:'襪',t:'袜子'},{w:'袋',t:'包'},{w:'眼鏡',t:'眼镜'},{w:'皮帶',t:'皮带'},{w:'戒指',t:'戒指'}]}]}`,
    nature: `{id:'nature',name:'大自然',subgroups:[{label:null,items:[{w:'狗',t:'狗'},{w:'貓',t:'猫'},{w:'雀仔',t:'鸟'},{w:'魚',t:'鱼'},{w:'馬',t:'马'},{w:'樹',t:'树'},{w:'花',t:'花'},{w:'草',t:'草'},{w:'山',t:'山'},{w:'河',t:'河'},{w:'海',t:'海'},{w:'天',t:'天空'},{w:'太陽',t:'太阳'},{w:'月亮',t:'月亮'},{w:'星',t:'星星'}]}]}`,
    jobs: `{id:'職業',name:'職業',subgroups:[{label:null,items:[{w:'警察',t:'警察'},{w:'工人',t:'工人'},{w:'司機',t:'司机'},{w:'老闆',t:'老板'},{w:'員工',t:'员工'},{w:'農夫',t:'农夫'},{w:'廚師',t:'厨师'},{w:'藝術家',t:'艺术家'},{w:'歌手',t:'歌手'},{w:'演員',t:'演员'},{w:'作家',t:'作家'},{w:'護士',t:'护士'},{w:'經理',t:'经理'},{w:'飛機師',t:'飞行员'},{w:'工程師',t:'工程师'}]}]}`
  }
};
// Fix the jobs ID for cantonese
newCats.yue.jobs = `{id:'jobs',name:'職業',subgroups:[{label:null,items:[{w:'警察',t:'警察'},{w:'工人',t:'工人'},{w:'司機',t:'司机'},{w:'老闆',t:'老板'},{w:'員工',t:'员工'},{w:'農夫',t:'农夫'},{w:'廚師',t:'厨师'},{w:'藝術家',t:'艺术家'},{w:'歌手',t:'歌手'},{w:'演員',t:'演员'},{w:'作家',t:'作家'},{w:'護士',t:'护士'},{w:'經理',t:'经理'},{w:'飛機師',t:'飞行员'},{w:'工程師',t:'工程师'}]}]}`;

for (const lang of ['en', 'es', 'kr', 'yue']) {
  // Use regex to carefully capture the categories string
  // It starts with `categories:[` and ends right before `]},\n  grammar:{`
  const langRegex = new RegExp(`(${lang}: \\{[\\s\\S]*?vocab:\\{title:'[^']+',(?:subtitle:'[^']+',)?categories:\\[)([\\s\\S]*?)(\\]\\},\\n  grammar:\\{)`);
  
  html = html.replace(langRegex, (match, prefix, categoriesStr, suffix) => {
    // split by "\n    {id:'"
    const chunks = categoriesStr.split("\n    {id:'").filter(c => c.trim().length > 0);
    const extracted = {};
    for (const chunk of chunks) {
      const id = chunk.substring(0, chunk.indexOf("'"));
      let cleanChunk = chunk.trimEnd();
      if (cleanChunk.endsWith(',')) cleanChunk = cleanChunk.slice(0, -1);
      extracted[id] = "\n    {id:'" + cleanChunk;
    }
    
    // Add new ones
    for (const newId in newCats[lang]) {
      extracted[newId] = "\n    " + newCats[lang][newId];
    }
    
    let newCategoriesStr = "";
    for (const id of order) {
      if (extracted[id]) {
        newCategoriesStr += extracted[id] + ",";
      }
    }
    // Remove last comma and add a newline
    newCategoriesStr = newCategoriesStr.replace(/,$/, "\n  ");
    
    return prefix + newCategoriesStr + suffix;
  });
}

// Update getEsGenderInfo
html = html.replace(/const nounCats=\['home','restaurant','transport','relations','hobbies'\];/, "const nounCats=['home','restaurant','transport','relations','hobbies','body','clothes','nature','jobs'];");

html = html.replace(/const m=\['padre'.*?\];/, "const m=['padre','hermano','amigo','hijo','esposo','niño','profesor','vecino','compañero','dormitorio','baño','teléfono','reloj','arroz','pan','pescado','huevo','café','té','menú','tenedor','cuchillo','plato','aeropuerto','hotel','autobús','taxi','tren','mapa','boleto','pasaporte','banco','hospital','estudiante','azúcar','libro','deporte','juego','arte','viaje','baile','piano','equipo','pasatiempo','ojo','brazo','pie','cuerpo','pelo','médico','dolor','pantalones','vestido','abrigo','zapato','sombrero','calcetín','bolso','cinturón','anillo','perro','gato','pájaro','pez','caballo','árbol','río','mar','cielo','sol','policía','trabajador','conductor','jefe','empleado','granjero','cocinero','artista','cantante','actor','escritor','gerente','piloto','ingeniero'];");

html = html.replace(/const f=\['madre'.*?\];/, "const f=['madre','hermana','hija','esposa','casa','habitación','cocina','mesa','silla','cama','puerta','ventana','luz','computadora','llave','agua','carne','fruta','leche','sal','cuenta','cuchara','estación','izquierda','derecha','calle','escuela','música','película','foto','canción','guitarra','pelota','cabeza','oreja','boca','nariz','cara','mano','pierna','medicina','ropa','camisa','camiseta','falda','chaqueta','gafas','flor','hierba','montaña','luna','estrella','enfermera'];");

fs.writeFileSync('index.html', html);
console.log('Success');
