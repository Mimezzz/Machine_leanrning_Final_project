// define auto size function
function autoresize(constant){
    const width=window.innerWidth*0.8;

    constant.setFrameSize(width)
};

// plot tableau graphs
var viz
    function initViz() {
      var containerDiv = document.getElementById("plot1"),
      url = "https://public.tableau.com/views/Cryptocurrency_16426787728460/Dashboard1?:language=en-GB&publish=yes&:display_count=n&:origin=viz_share_link";
      var options = {
        width: window.innerWidth*0.8,
        height:'600px',
        // hideTabs: true,
        hideToolbar: true
      };
  
    viz = new tableau.Viz(containerDiv, url,options);
    }
    window.addEventListener('resize', ()=> {
        console.log(`resizing window, window inner weight ${window.innerWidth}, ${window.innerHeight}`);
        autoresize(viz);
    })

    initViz();



// plot pie chart with api data
var jsplot
    function initPlot() {
        var mcp_list=[];
        // for API call
        d3.json('https://api.coingecko.com/api/v3/global').then((data)=> {
            console.log(data.data.market_cap_percentage);
            mcp_list.push(data.data.market_cap_percentage);
            // console.log(mcp_list[0]);
            
            var data=[{
                values: Object.values(mcp_list[0]),
                labels: Object.keys(mcp_list[0]),
                domain:{column:0},
                hoverinfo:'label+percent',
                hole:0.4,
                type:'pie',
                textposition: "outside"
            }];

            var layout={
                title: 'Real Time World Cryptocurrency Market Cap Percentage',
                height: 400,
                width: window.innerWidth*0.8,
                showlegend: true,
            };
    
            Plotly.newPlot('plot2', data, layout);
    });
};
window.addEventListener('resize', ()=> {
    console.log(`resizing window, window inner weight ${window.innerWidth}, ${window.innerHeight}`);
    autoresize(jsplot);});
    
initPlot();

// plot machine learning findings
var plotml=d3.select('#plotml');
plotml.on('click',plot_machine_learning);


function plot_machine_learning(){
    var img = document.createElement("img");
    img.src = "../static/assets/img/4coins.png";
    var block = document.getElementById("mlplot1");
    block.appendChild(img);
    document.getElementById('textforplot1').textContent+='Bitcoin Closing Price chart with Existing Data';


   
    var img = document.createElement("img");
    img.src = "../static/assets/img/predictions.png";
    var block1 = document.getElementById("mlplot2");
    block1.appendChild(img);
    block1.innerHTML+='Machine Learning Training Outcome'

    var img = document.createElement("img");
    img.src = "../static/assets/img/varians.png";
    var block2 = document.getElementById("mlplot3");
    block2.appendChild(img);
    
    var img = document.createElement("img");
    img.src = "../static/assets/img/coin_corrs.png";
    var block3 = document.getElementById("mlplot5");
    block3.appendChild(img);

    var img = document.createElement("img");
    img.src = "../static/assets/img/factor_corrs.png";
    var block4 = document.getElementById("mlplot6");
    block4.appendChild(img);

    var img = document.createElement("img");
    img.src = "../static/assets/img/residualmap.png";
    var block5 = document.getElementById("mlplot7");
    block5.appendChild(img);
    block5.appendChild(img);
 
}

var tablebutton=d3.select('#pricepredictionbutton');
tablebutton.on('click',plot_table);

function plot_table(){
d3.csv('../data/new30days_data.csv').then((data)=>{

    var tbody=d3.select('table');
    data.forEach((item)=>{
    console.log(item);
    var row=tbody.append('tr');
    // console.log('added row');
    Object.entries(item).forEach(([key,value])=>{
        console.log(key,value);
    var cell=row.append('td').text(value);
        
    });});
});
};

// function plot_prediction(){
//     d3.json('../../data/test_data.json').then((data)=>{
//         console.log(Object.keys(data.Close));
    
        
//         var trace1={
//             x:Object.keys(data.Close),
//             y:Object.values(data.Close),
//             type:'line'
//         };
    
//         var trace2={
//             x:Object.keys(data.Predictions),
//             y:Object.values(data.Predictions),
//             type:'line'
//         }
        
//         var data=[trace1,trace2];
//         Plotly.newPlot('mlplot3','data')
    
//     })};
   

    

















// webpage design
window.addEventListener('DOMContentLoaded', event => {

    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    let scrollToTopVisible = false;
    // Closes the sidebar menu
    const menuToggle = document.body.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', event => {
        event.preventDefault();
        sidebarWrapper.classList.toggle('active');
        _toggleMenuIcon();
        menuToggle.classList.toggle('active');
    })

    // Closes responsive menu when a scroll trigger link is clicked
    var scrollTriggerList = [].slice.call(document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger'));
    scrollTriggerList.map(scrollTrigger => {
        scrollTrigger.addEventListener('click', () => {
            sidebarWrapper.classList.remove('active');
            menuToggle.classList.remove('active');
            _toggleMenuIcon();
        })
    });

    function _toggleMenuIcon() {
        const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
        const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-times');
        if (menuToggleBars) {
            menuToggleBars.classList.remove('fa-bars');
            menuToggleBars.classList.add('fa-times');
        }
        if (menuToggleTimes) {
            menuToggleTimes.classList.remove('fa-times');
            menuToggleTimes.classList.add('fa-bars');
        }
    }

    // Scroll to top button appear
    document.addEventListener('scroll', () => {
        const scrollToTop = document.body.querySelector('.scroll-to-top');
        if (document.documentElement.scrollTop > 100) {
            if (!scrollToTopVisible) {
                fadeIn(scrollToTop);
                scrollToTopVisible = true;
            }
        } else {
            if (scrollToTopVisible) {
                fadeOut(scrollToTop);
                scrollToTopVisible = false;
            }
        }
    })
})

function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};



