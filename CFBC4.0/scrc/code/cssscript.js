document.addEventListener('DOMContentLoaded', function () {
    function alternateDivs() {
        const div1 = document.querySelector('.escondido1');
        const div2 = document.querySelector('.escondido2');

        setInterval(function () {
          if (div1.style.display === 'none') {
            div1.style.display = 'block';
            div2.style.display = 'none';
          } else {
            div1.style.display = 'none';
            div2.style.display = 'block';
          }
        }, 5000); // Altere o intervalo de tempo conforme necessário
      }
      alternateDivs();

      





    const width = 300;
    const height = 200;
    const svg = d3.select(".chart-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

     // Adiciona a grade
     for (let i = 1; i <= 10; i++) {
        svg.append("line")
          .attr("class", "grid-line")
          .attr("x1", 0)
          .attr("y1", i * height / 5)
          .attr("x2", width)
          .attr("y2", i * height / 5);
      }
    const line = d3.line()
        .x((d, i) => i * (width / 3))
        .y(d => 120 - d * 7)
        .curve(d3.curveCardinal); // Alterado para curva Cardinal para suavizar ainda mais

    let data = generateSmoothData(); // Função para gerar dados mais suaves

    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "#4caf50")
        .attr("stroke-width", 3);

    function updateChart() {
        data.shift();
        data.push(Math.floor(Math.random() * 5) + 1); // Alterado o intervalo para gerar valores menores

        svg.select(".line")
        .data([data])
        .transition()
        .duration(1000)
        .attr("d", line);
    }

    function generateSmoothData() {
        return Array.from({ length: 5 }, (_, i) => i === 0 || i === 4 ? 0 : Math.floor(Math.random() * 5) + 1);
    }

    setInterval(updateChart, 1000);
    updateChart();











    // section 2
    const progressCircle = document.getElementById('progress-circle');
    const progressText = document.getElementById('progress-text');
    const counterText = document.getElementById('counter-text');
    
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.5 // Trigger when 50% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // If the element is in the viewport, start the animation
          animateProgressBar();
          observer.unobserve(entry.target); // Stop observing once triggered
        }
      });
    }, options);

    // Start observing the target element
    observer.observe(progressCircle);

    function animateProgressBar() {
      let progress = 0;
      const interval = setInterval(() => {
        if (progress >= 100) {
          clearInterval(interval);
        } else {
          progress += 1;
          progressCircle.style.transform = `rotate(${(progress / 100) * 360 - 90}deg)`;
          progressText.textContent = `${progress}%`;
          counterText.textContent = `${Math.round((progress / 1) * 1)}万`;
        }
      }, 200);
    }
  });