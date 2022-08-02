window.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault();
    //task-1

    document.querySelectorAll('.offer__action__acc').
        forEach(item => item.addEventListener('click', e => handleItemClick(e)));

    const handleItemClick = (e) => {
        const body = e.target.parentNode.querySelector('.offer__action__acc__body');
        const content = e.target.parentNode.querySelector('.offer__action__body-content');
        const isOpen = body.getBoundingClientRect().height > 0

        if (isOpen) {
            body.style.height = '0px';
        } else {
            body.style.height = `${content.getBoundingClientRect().height}px`;
        }

    }

    //task-3

    var element = document.getElementById('phone');
    var maskOptions = {
        mask: '+{7}(000)000-00-00'
    };
    var mask = IMask(element, maskOptions);
    mask.value = "";
    var dynamicMask = IMask(
        document.getElementById('mail'),
        {
            mask: [
                {
                    mask: /^\S*@?\S*$/
                }
            ]
        });
    dynamicMask.value = "";


    const form = document.querySelectorAll('form'),
        input = document.querySelectorAll('input');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так'
    }

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    const clearInputs = () => {
        input.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    statusMessage.textContent = message.success;
                })
                .catch(() => {
                    statusMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });
        });
    });

    //task-4

    toggler = document.querySelector('.task-4__header__toggle');
    toggler.addEventListener('click', () => {
        toggler.classList.toggle('task-4__header__toggle__on');
    });
    
    {
        var chart = am4core.create("canvas-country-amount", am4charts.PieChart);

        // Add data
        chart.data = [{
            "country": "Россия",
            "litres": 167,
            "color": am4core.color("#E83C46")
        }, {
            "country": "Казахстан",
            "litres": 110,
            "color": am4core.color("orange")
        }, {
            "country": "Узбекистан",
            "litres": 58,
            "color": am4core.color("black")
        }];

        var pieSeries = chart.series.push(new am4charts.PieSeries());
        chart.radius = am4core.percent(95);
        pieSeries.slices.template.propertyFields.fill = "color";
        pieSeries.dataFields.value = "litres";
        pieSeries.dataFields.category = "country";
        chart.innerRadius = am4core.percent(80);
        pieSeries.ticks.template.disabled = true;
        pieSeries.labels.template.disabled = true;
        pieSeries.rotation = 270;

        var rgm = new am4core.LinearGradientModifier();
        rgm.brightnesses.push(0, - 0.2);
        pieSeries.slices.template.fillModifier = rgm;

        var rgm2 = new am4core.LinearGradientModifier();
        rgm2.brightnesses.push(0, - 0.2);

        pieSeries.slices.template.strokeModifier = rgm2;
        pieSeries.slices.template.strokeOpacity = 1;
        pieSeries.slices.template.strokeWidth = 1;


        pieSeries.slices.template.events.on("validated", function (event) {
            var gradient = event.target.fillModifier.gradient
            gradient.rotation = event.target.middleAngle + 90;

            var gradient2 = event.target.strokeModifier.gradient
            gradient2.rotation = event.target.middleAngle + 90;
        })

        let label = pieSeries.createChild(am4core.Label);
        label.text = "{values.value.sum}";
        label.horizontalCenter = "middle";
        label.verticalCenter = "middle";
        label.y = -5;
        label.fontSize = 38;
        label.fontFamily = "Commissioner";
        label.fontWeight = '600';
        label.rotation = 90;

        let label1 = pieSeries.createChild(am4core.Label);
        label1.text = "шт.";
        label1.horizontalCenter = "middle";
        label1.x = -20;
        label1.y = -1;
        label1.fontSize = 16;
        label1.fontFamily = "Commissioner";
        label1.rotation = 90;

        let title = chart.titles.create();
        title.text = "Страны";
        title.fontSize = 14;
        title.fontFamily = "Commissioner";
        title.fill = am4core.color("#A7A7A7");
        title.align = 'left';


        // Disable tooltips
        // pieSeries.slices.template.tooltipText = "";

        chart.legend = new am4charts.Legend();
        chart.legend.valueLabels.template.text = '';
        chart.legend.labels.template.text = '- {name}';
        chart.legend.position = "bottom";
        chart.legend.contentAlign = "left";
        chart.legend.fontFamily = "Commissioner";
        chart.legend.fontSize = 12;
        chart.legend.labels.template.marginLeft = 0;
        chart.legend.labels.template.wrap = true;


        let marker = chart.legend.markers.template.children.getIndex(0);
        chart.legend.markers.template.width = 18;
        marker.width = 11;
        marker.height = 11;
        marker.cornerRadius(12, 12, 12, 12);
        marker.strokeWidth = 1;
        marker.strokeOpacity = 0.5;
        marker.y = 5.5;
    }

    {
        var chart = am4core.create("canvas-cities-amount", am4charts.PieChart);

        // Add data
        chart.data = [{
            "country": "Тюмень",
            "litres": 164,
            "color": am4core.color("#E83C46"),
        }, {
            "country": "Петербург",
            "litres": 371,
            "color": am4core.color("#005FA7"),
        }, {
            "country": "Нур-Султан",
            "litres": 184,
            "color": am4core.color("orange"),
        }, {
            "country": "Алма-Аты",
            "litres": 193,
            "color": am4core.color("#808080"),
        }, {
            "country": "Ташкент",
            "litres": 153,
            "color": am4core.color("black"),
        }];

        var pieSeries = chart.series.push(new am4charts.PieSeries());
        chart.radius = am4core.percent(95);
        chart.innerRadius = am4core.percent(80);
        pieSeries.slices.template.propertyFields.fill = "color";
        pieSeries.dataFields.value = "litres";
        pieSeries.dataFields.category = "country";
        pieSeries.ticks.template.disabled = true;
        pieSeries.labels.template.disabled = true;
        pieSeries.rotation = 270;

        var rgm = new am4core.LinearGradientModifier();
        rgm.brightnesses.push(0, - 0.2);
        pieSeries.slices.template.fillModifier = rgm;

        var rgm2 = new am4core.LinearGradientModifier();
        rgm2.brightnesses.push(0, - 0.2);

        pieSeries.slices.template.strokeModifier = rgm2;
        pieSeries.slices.template.strokeOpacity = 1;
        pieSeries.slices.template.strokeWidth = 1;


        pieSeries.slices.template.events.on("validated", function (event) {
            var gradient = event.target.fillModifier.gradient
            gradient.rotation = event.target.middleAngle + 90;

            var gradient2 = event.target.strokeModifier.gradient
            gradient2.rotation = event.target.middleAngle + 90;
        })

        let label = pieSeries.createChild(am4core.Label);
        label.text = "1 065";
        label.horizontalCenter = "middle";
        label.verticalCenter = "middle";
        label.y = -5;
        label.fontSize = 38;
        label.fontFamily = "Commissioner";
        label.fontWeight = '600';
        label.rotation = 90;

        let label1 = pieSeries.createChild(am4core.Label);
        label1.text = "шт.";
        label1.horizontalCenter = "middle";
        label1.x = -22;
        label1.y = -1;
        label1.fontSize = 16;
        label1.fontFamily = "Commissioner";
        label1.rotation = 90;

        let title = chart.titles.create();
        title.text = "Города";
        title.fontSize = 14;
        title.fontFamily = "Commissioner";
        title.fill = am4core.color("#A7A7A7");
        title.align = 'left';


        // Disable tooltips
        // pieSeries.slices.template.tooltipText = "";

        chart.legend = new am4charts.Legend();
        chart.legend.align = "start";
        chart.legend.position = "bottom";
        chart.legend.valueLabels.template.text = "";
        chart.legend.labels.template.text = '- {name}';
        chart.legend.position = "bottom";
        chart.legend.contentAlign = "left";
        chart.legend.fontFamily = "Commissioner";
        chart.legend.fontSize = 12;
        chart.legend.labels.template.marginLeft = 0;
        chart.legend.labels.template.truncate = true;
        chart.legend.labels.template.wrap = true;
        chart.legend.maxHeight = 105;
        chart.legend.scrollable = true;

        let marker = chart.legend.markers.template.children.getIndex(0);
        chart.legend.markers.template.width = 18;
        marker.width = 11;
        marker.height = 11;
        marker.cornerRadius(12, 12, 12, 12);
        marker.strokeWidth = 1;
        marker.strokeOpacity = 0.5;
        marker.y = 5.5;


    }

    {
        var chart = am4core.create("canvas-country-sum", am4charts.PieChart);

        // Add data
        chart.data = [{
            "country": "Россия",
            "litres": 65,
            "color": am4core.color("#E83C46")
        }, {
            "country": "Казахстан",
            "litres": 45,
            "color": am4core.color("orange")
        }, {
            "country": "Узбекистан",
            "litres": 20,
            "color": am4core.color("black")
        }];

        var pieSeries = chart.series.push(new am4charts.PieSeries());
        chart.radius = am4core.percent(95);
        pieSeries.slices.template.propertyFields.fill = "color";
        pieSeries.dataFields.value = "litres";
        pieSeries.dataFields.category = "country";
        chart.innerRadius = am4core.percent(80);
        pieSeries.ticks.template.disabled = true;
        pieSeries.labels.template.disabled = true;
        pieSeries.rotation = 270;

        var rgm = new am4core.LinearGradientModifier();
        rgm.brightnesses.push(0, - 0.2);
        pieSeries.slices.template.fillModifier = rgm;

        var rgm2 = new am4core.LinearGradientModifier();
        rgm2.brightnesses.push(0, - 0.2);

        pieSeries.slices.template.strokeModifier = rgm2;
        pieSeries.slices.template.strokeOpacity = 1;
        pieSeries.slices.template.strokeWidth = 1;


        pieSeries.slices.template.events.on("validated", function (event) {
            var gradient = event.target.fillModifier.gradient
            gradient.rotation = event.target.middleAngle + 90;

            var gradient2 = event.target.strokeModifier.gradient
            gradient2.rotation = event.target.middleAngle + 90;
        })

        let label = pieSeries.createChild(am4core.Label);
        label.text = "$ {values.value.sum}";
        label.horizontalCenter = "middle";
        label.verticalCenter = "middle";
        label.y = -5;
        label.fontSize = 38;
        label.fontFamily = "Commissioner";
        label.fontWeight = '600';
        label.rotation = 90;

        let label1 = pieSeries.createChild(am4core.Label);
        label1.text = "млн.";
        label1.horizontalCenter = "middle";
        label1.x = -20;
        label1.y = -1;
        label1.fontSize = 16;
        label1.fontFamily = "Commissioner";
        label1.rotation = 90;

        let title = chart.titles.create();
        title.text = "Страны";
        title.fontSize = 14;
        title.fontFamily = "Commissioner";
        title.fill = am4core.color("#A7A7A7");
        title.align = 'left';


        // Disable tooltips
        // pieSeries.slices.template.tooltipText = "";

        chart.legend = new am4charts.Legend();
        chart.legend.valueLabels.template.text = '';
        chart.legend.labels.template.text = '- {name}';
        chart.legend.position = "bottom";
        chart.legend.contentAlign = "left";
        chart.legend.fontFamily = "Commissioner";
        chart.legend.fontSize = 12;
        chart.legend.labels.template.marginLeft = 0;
        chart.legend.labels.template.wrap = true;


        let marker = chart.legend.markers.template.children.getIndex(0);
        chart.legend.markers.template.width = 18;
        marker.width = 11;
        marker.height = 11;
        marker.cornerRadius(12, 12, 12, 12);
        marker.strokeWidth = 1;
        marker.strokeOpacity = 0.5;
        marker.y = 5.5;
    }

    {
        var chart = am4core.create("canvas-cities-sum", am4charts.PieChart);

        // Add data
        chart.data = [{
            "country": "Тюмень",
            "litres": 20,
            "color": am4core.color("#E83C46"),
        }, {
            "country": "Петербург",
            "litres": 45,
            "color": am4core.color("#005FA7"),
        }, {
            "country": "Нур-Султан",
            "litres": 20,
            "color": am4core.color("orange"),
        }, {
            "country": "Алма-Аты",
            "litres": 25,
            "color": am4core.color("#808080"),
        }, {
            "country": "Ташкент",
            "litres": 20,
            "color": am4core.color("black"),
        }];

        var pieSeries = chart.series.push(new am4charts.PieSeries());
        chart.radius = am4core.percent(95);
        chart.innerRadius = am4core.percent(80);
        pieSeries.slices.template.propertyFields.fill = "color";
        pieSeries.dataFields.value = "litres";
        pieSeries.dataFields.category = "country";
        pieSeries.ticks.template.disabled = true;
        pieSeries.labels.template.disabled = true;
        pieSeries.rotation = 270;

        var rgm = new am4core.LinearGradientModifier();
        rgm.brightnesses.push(0, - 0.2);
        pieSeries.slices.template.fillModifier = rgm;

        var rgm2 = new am4core.LinearGradientModifier();
        rgm2.brightnesses.push(0, - 0.2);

        pieSeries.slices.template.strokeModifier = rgm2;
        pieSeries.slices.template.strokeOpacity = 1;
        pieSeries.slices.template.strokeWidth = 1;


        pieSeries.slices.template.events.on("validated", function (event) {
            var gradient = event.target.fillModifier.gradient
            gradient.rotation = event.target.middleAngle + 90;

            var gradient2 = event.target.strokeModifier.gradient
            gradient2.rotation = event.target.middleAngle + 90;
        })

        let label = pieSeries.createChild(am4core.Label);
        label.text = "$ {values.value.sum}";
        label.horizontalCenter = "middle";
        label.verticalCenter = "middle";
        label.y = -5;
        label.fontSize = 38;
        label.fontFamily = "Commissioner";
        label.fontWeight = '600';
        label.rotation = 90;

        let label1 = pieSeries.createChild(am4core.Label);
        label1.text = "млн.";
        label1.horizontalCenter = "middle";
        label1.x = -22;
        label1.y = -1;
        label1.fontSize = 16;
        label1.fontFamily = "Commissioner";
        label1.rotation = 90;

        let title = chart.titles.create();
        title.text = "Города";
        title.fontSize = 14;
        title.fontFamily = "Commissioner";
        title.fill = am4core.color("#A7A7A7");
        title.align = 'left';


        // Disable tooltips
        // pieSeries.slices.template.tooltipText = "";

        chart.legend = new am4charts.Legend();
        chart.legend.align = "start";
        chart.legend.position = "bottom";
        chart.legend.valueLabels.template.text = "";
        chart.legend.labels.template.text = '- {name}';
        chart.legend.position = "bottom";
        chart.legend.contentAlign = "left";
        chart.legend.fontFamily = "Commissioner";
        chart.legend.fontSize = 12;
        chart.legend.labels.template.marginLeft = 0;
        chart.legend.labels.template.truncate = true;
        chart.legend.labels.template.wrap = true;
        chart.legend.maxHeight = 105;
        chart.legend.scrollable = true;

        let marker = chart.legend.markers.template.children.getIndex(0);
        chart.legend.markers.template.width = 18;
        marker.width = 11;
        marker.height = 11;
        marker.cornerRadius(12, 12, 12, 12);
        marker.strokeWidth = 1;
        marker.strokeOpacity = 0.5;
        marker.y = 5.5;
    }
})