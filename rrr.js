var rrr = {};

rrr.setLang = function(language) {
Cookies.remove('lang');
Cookies.set('lang', language);

};

rrr.getLang = function() {  
  var mylang = Cookies.get('lang');
  	if(mylang  === undefined ) {
		rrr.setLang('ru');
		mylang = 'ru';
	};
  return mylang;
};


rrr.navbar = function() {
	 $('div.navigation').load("navbar.html");
};

rrr.footer = function() {
    $('footer.footer').load("footer.html");

};

rrr.applyObject = function(obj, elem) {
  for (var key in obj) {
    elem.find('[data-name="' + key + '"]').html(obj[key]);

  }
};
rrr.template = function(name) {
  return $('.templates .' + name).clone();

};

rrr.weekView = function(num) {
  function findWeek(obj) {
    return obj.week === num;
  };
// added ability to use markdown in posts. 

  var current = rrr.info.find(findWeek);
  var lang = rrr.getLang();
  var postPath = lang + '/' + num + '/' +  "post.md";
  var view = rrr.template( lang.concat('week-view') );
  var converter = new showdown.Converter();
  converter.setOption('tasklists', 'true');
  $.get( postPath, function(data) {
    // markdown converted to html by showdown
    var post  =  converter.makeHtml(data);
    view.find('.blog-post').html( post );
// wrap lists in jumbotron
    view.find('ul').wrap('<div class="jumbotron"></div>');
    
  } );
  rrr.applyObject(current, view);
  return view;

};


rrr.landingView = function() {
  var cw = rrr.currentWeek();
  var view  = rrr.weekView(cw);
  return view;
};

rrr.e404View = function() {
  var view = rrr.template('404')
  return view;
};


rrr.currentWeek = function() {
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var now = new Date();
  var currentMonth = months[now.getMonth()];

  var y = now.getFullYear();

  function fw(elm) {
    var start = new Date(elm.month + ' ' + elm.day + ',' + y + ' 00:00:00');
    var end = new Date(elm.end + ',' + y + ' 23:59:59');
    return (now >= start &&  now <= end) ;
  };
  var mem =  rrr.info.find(fw);
  return mem.week;
};


rrr.cl = function() {
	var hash = window.location.hash;
	if ( hash == '') {
		hash = '#week/' + rrr.currentWeek();	
	}
	return hash;
};




rrr.path = function(hash) {
  var hashParts = hash.split('/');
  var viewFn = routes[hashParts[0]];

};

//new showView - uses regexps to find appropriate routes
rrr.showView = function(hash) {
  var routes = {
    '^#week\/[0-9]{1,2}$' : rrr.weekView,
    '^#week$|^#week\/$|^#week\/.(?!\d)' : rrr.landingView,
    '^$' : rrr.landingView,
    '^#$' : rrr.landingView,
    '#(?!^week$).*' : rrr.e404View
  };
  var hashParts = hash.split('/');

  var paths = Object.keys(routes);

  function findRoute( element) {
    var re = new RegExp(element);
    return re.test(hash);
  };
 
  var viewFn =  routes[ paths.find(findRoute)];
    console.log(viewFn);
  var cw = Number(rrr.currentWeek()) + 2;
  if(hashParts[1] > cw ) {
     $('.view-container').empty().html( rrr.e404View );
  }
  else {
    $('.view-container').empty().html( viewFn(hashParts[1]) );
  }
};



rrr.appOnReady = function () {
  window.onhashchange = function() {
    rrr.showView(window.location.hash);
    rrr.navbar();
  };

  rrr.showView(window.location.hash);
  rrr.navbar();
  rrr.footer();
};


function myFunction() {
    
  return rrr.info;
}




rrr.info = [
    {
    week: "1",
    month: "January",
    day: "29",
    end: "February 4",
    topic: "СЕКРЕТ ВЛИЯНИЯ",
    etopic: "Secret of Influence",
    lead: "Какого рода перемены нужны современному христианину и Церкви в целом",
    elead: "",
    speaker: "Ст. пастор церкви «Дом Хлеба» Александр Шевченко",
    espeaker: "pastor Alex Shevchenko",
    video: "<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/38NR1rZuXeE' frameborder='0' allowfullscreen></iframe>",
    evideo: "<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/3ch3-yyO5SA' frameborder='0' allowfullscreen></iframe>"
    },
  {
    week: "2",
    month: "February",    
    day: "5",
    end: "February 11",
    topic: "РОЖДЕНИЕ СВЫШЕ",
    etopic: "Born Again",
    lead: "РОЖДЕНИЯ СВЫШЕ В ХРИСТИАНСКОЙ СРЕДЕ",
    elead: "Born Again",
    speaker: "Ст. пастор церкви «Дом Хлеба» Александр Шевченко",
    speaker: "Alex Shevchenko",
    video: "<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/L17_yqdLxM0' frameborder='0' allowfullscreen></iframe>",
    evideo: "<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/L17_yqdLxM0' frameborder='0' allowfullscreen></iframe>"
  },

    {
    week: "3",
    month: "February",    
    day: "12",
    end: "February 18",
    topic: "Откровение и целеустремленность",
    etopic: "Revelation and Purpose",
    lead: "Откровение и целеустремленность",
    elead: "Revelation and Purpose",
    speaker: "Пастор церкви «Дом Хлеба» Владимир Котяков",
    espeaker: "House of Bread Church Pastor Vladimir Kotyakov",
    video: "<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/HLdobBIRVC0' frameborder='0' allowfullscreen></iframe>",
    evideo: "<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/WKqLIUuC_dE' frameborder='0' allowfullscreen></iframe>"
  },

    {
    week: "4",
    month: "February",
    day: "19",
    end: "February 25",
    topic: "НА КОМ ПРЕТЫКАЮТСЯ ЛЮДИ?",
    etopic: "PEOPLE",
    lead: "Внутреннее изменение благословляет других ",
    elead: "Internal changes",
    speaker: "Ст. пастор церкви «Дом Хлеба» Александр Шевченко",
    espeaker: "Alex Shevchenko",
    video: "<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/mSChuRfd-lQ' frameborder='0' allowfullscreen></iframe>",
    evideo: "<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/mSChuRfd-lQ' frameborder='0' allowfullscreen></iframe>",
    img: ""
  },

    {
    week: "5",
    month: "February",
    day: "26",
    end: "March 4",
    topic: "КАК В СЕМЬЕ ПРОИСХОДИТ ВЛИЯНИЕ?",
    etopic: "IMPACT IN FAMILY",
    lead: "Позитивные изменения в семье",
    elead: "Transforming families",
    speaker: "Ст. пастор церкви «Дом Хлеба» Александр  Шевченко",
    espeaker: "Alex Shevchenko",
    video: "<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/-7W-BIs7e4I' frameborder='0' allowfullscreen></iframe>",
    evideo: "<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/-7W-BIs7e4I' frameborder='0' allowfullscreen></iframe>",
    img: ""
  },

  {
    week: "6",
    month: "March",
    day: "5",
    end: "March 11",
    topic: " ВЛИЯНИЕ НА ДРУЗЕЙ",
    etopic: "FRIENDSHIP",
    lead: "Позитивное и негативное влияние дружбы",
    elead: "Transforming frienship",
    speaker: "Ст. пастор церкви «Дом Хлеба» Александр Шевченко",
    espeaker: "Alex Shevchenko",
    video: "<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/sXo0FAtmTCk' frameborder='0' allowfullscreen></iframe>",
    evideo: "<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/sXo0FAtmTCk' frameborder='0' allowfullscreen></iframe>",
    img: ""
  },

    {
    week: "7",
    month: "March",
    day: "12",
    end: "March 18",
    topic: "ЧТО ОПРЕДЕЛЯЮТ ВЗАИМООТНОШЕНИЯ?",
    etopic: "Relationships",
    speaker: "Пастор церкви «Дом Хлеба» Сергей Витюков",
    espeaker: "Pastor Sergey Vityukov",
    video: "<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/PRtc8ZL2Xs0' frameborder='0' allowfullscreen></iframe>",
    evideo: "<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/PRtc8ZL2Xs0' frameborder='0' allowfullscreen></iframe>",
    img: ""
  },

    {
    week: "8",
    month: "March",
    day: "19",
    end: "March 25",
    topic: "ЛИЧНЫЕ РЕФОРМЫ",
    etopic: "",
    speaker: "Эдуард Кислянка – руководитель студенческого служения церкви «Дом Хлеба»",
    espeaker: "Edward Kislyanka",
    video: "<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/Smb4IY7q3As' frameborder='0' allowfullscreen></iframe>",
    evideo: "<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/Smb4IY7q3As' frameborder='0' allowfullscreen></iframe>",
    img: ""
  },

    {
    week: "9",
    month: "March",
    day: "26",
    end: "April 1",
    topic: "РЕФОРМАЦИЯ В БЛИЗКОМ ОКРУЖЕНИИ",
    etopic: "",
    speaker: "Эдуард Кислянка – руководитель студенческого служения церкви «Дом Хлеба»",
    espeaker: "Edward Kislyanka",
    video: "<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/Gkk7FwaY63w' frameborder='0' allowfullscreen></iframe>",
    evideo: "<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/Gkk7FwaY63w' frameborder='0' allowfullscreen></iframe>",
    img: ""
  },

  {
    week: "9",
    month: "April",
    day: "2",
    end: "April 8",
    topic: "НА КОМ ПРЕТЫКАЮТСЯ ЛЮДИ?",
    etopic: "",
    speaker: "Alex Shevchenko",
    video: "<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/HhjDJanuary' frameborder='0' allowfullscreen></iframe>6MgY",
    evideo: "<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/W4VT7RzACyM' frameborder='0' allowfullscreen></iframe>",
    img: ""
  },

    {
    week: "10",
    month: "April",
    day: "9",
    end: "April 10",
    topic: "First Article",
    etopic: "",
    speaker: "Valeriy Khimich",
    video: "<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/h_QJgcI8vDI' frameborder='0' allowfullscreen></iframe>",
    evideo: "<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/W4VT7RzACyM' frameborder='0' allowfullscreen></iframe>",
    img: ""
  },

    {
    week: "11",
    month: "April",
    day: "11",
    end: "April 22",
    topic: "EASTER SERVICE",
    etopic: "",
    speaker: "Alex Shevchenko",
    video: "<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/OlfJg2LSMIE' frameborder='0' allowfullscreen></iframe>",
    evideo: "<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/W4VT7RzACyM' frameborder='0' allowfullscreen></iframe>",
    img: ""
  },
    {
    week: "12",
    month: "April",
    day: "23",
    end: "April 29",
    topic: "О ДРУЖЕЛЮБИИ, ДРУЖБЕ И ДРУЗЬЯХ",
    etopic: "",
    speaker: "Alex Shevchenko",
    video: "<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/QGx_wbVJ07c' frameborder='0' allowfullscreen></iframe>",
    evideo: "<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/W4VT7RzACyM' frameborder='0' allowfullscreen></iframe>",
    img: ""
  },
    {
    week: "13",
    month: "April",
    day: "30",
    end: "May 5",
    topic: "First Article",
    etopic: "",
    speaker: "Sergey Vityukov",
    video: "<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/QGx_wbVJ07c' frameborder='0' allowfullscreen></iframe>",
    evideo: "<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/W4VT7RzACyM' frameborder='0' allowfullscreen></iframe>",
    img: ""
    },

    {
    week: "14",
    month: "January",
    day: "23",
    end: "January 28",
    topic: "ЯНВАРЬСКАЯ ТЕМА",
    etopic:	"English Topic",
    speaker:	"Alex Shevchenko",
    video:	"<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/QGx_wbVJ07c' frameborder='0' allowfullscreen></iframe>",
    evideo:	"<iframe id='vid' width='1280' height='720' src='https://www.youtube.com/embed/W4VT7RzACyM' frameborder='0' allowfullscreen></iframe>"
  }

];

