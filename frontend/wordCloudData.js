document.addEventListener('DOMContentLoaded', function() {
    // Get the container element for the word cloud
    var container = document.getElementById('container');
    var wc = new Js2WordCloud(container);

    // Function to update the word cloud with new data
    function updateWordCloud(data) {
        var list = data.map(function(item) {
            // Assuming the format of your data is [["Category Name", count], ...]
            return [item[0], item[1]];
        });
        var option = {
            tooltip: {
                show: true,
                formatter: function(item) {
                    return item[0] + ': ' + item[1] + '<br>' + 'world cloud';
                }
            },
            list: list,
            color: '#15a4fa',
            shape: 'circle',
            ellipticity: 1
        };
        wc.setOption(option);
    }

    // Function to fetch category count data
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
                updateWordCloud(data.data); // Assuming 'data' is the object with a 'data' property
            })
            .catch(error => {
                console.error('Error fetching category count data:', error);
                wc.hideLoading();
            });
    }

    // Load the word cloud data when the page loads
    fetchCategoryData();
});
