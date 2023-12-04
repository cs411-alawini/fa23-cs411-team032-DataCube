var wc;
document.addEventListener('DOMContentLoaded', function() {
    var container = document.getElementById('container');
    container.style.height = '320px';
    wc = new Js2WordCloud(container);

    function updateWordCloud(data) {
        var list = data.map(function(item) {
            return [item[0], item[1]];
        });
        var option = {
            list: list,
            color: '#15a4fa',
            shape: 'circle',
            ellipticity: 1
        };
        wc.setOption(option);
    }

    function fetchCategoryData() {
        wc.showLoading({
            backgroundColor: '#fff',
            text: 'Loading...',
            effect: 'spin'
        });

        fetch('http://localhost:4000/category/count')
            .then(response => response.json())
            .then(data => {
                wc.hideLoading();
                updateWordCloud(data.data);
            })
            .catch(error => {
                console.error('Error fetching category count data:', error);
                wc.hideLoading();
            });
    }

    fetchCategoryData();
});
