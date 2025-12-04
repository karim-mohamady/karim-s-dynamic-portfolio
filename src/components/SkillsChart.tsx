import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useTheme } from '@/hooks/useTheme';

interface Skill {
  name: string;
  level: number;
  color: string;
}

const skills: Skill[] = [
  { name: 'React', level: 95, color: '#61DAFB' },
  { name: 'TypeScript', level: 90, color: '#3178C6' },
  { name: 'Next.js', level: 88, color: '#ffffff' },
  { name: 'JavaScript', level: 95, color: '#F7DF1E' },
  { name: 'Tailwind', level: 92, color: '#06B6D4' },
  { name: 'CSS/SCSS', level: 90, color: '#CC6699' },
  { name: 'HTML5', level: 95, color: '#E34F26' },
  { name: 'D3.js', level: 75, color: '#F9A03C' },
];

export function SkillsChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 400;
    const height = 400;
    const margin = 60;
    const radius = Math.min(width, height) / 2 - margin;

    const container = svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Create scales
    const angleScale = d3
      .scaleBand()
      .domain(skills.map((d) => d.name))
      .range([0, 2 * Math.PI]);

    const radiusScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, radius]);

    // Draw background circles
    const gridLevels = [25, 50, 75, 100];
    const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    const textColor = theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';

    gridLevels.forEach((level) => {
      container
        .append('circle')
        .attr('r', radiusScale(level))
        .attr('fill', 'none')
        .attr('stroke', gridColor)
        .attr('stroke-dasharray', '3,3');

      container
        .append('text')
        .attr('x', 5)
        .attr('y', -radiusScale(level))
        .text(`${level}%`)
        .attr('font-size', '10px')
        .attr('fill', textColor)
        .attr('alignment-baseline', 'middle');
    });

    // Draw axis lines
    skills.forEach((skill) => {
      const angle = angleScale(skill.name)! + angleScale.bandwidth() / 2;
      const lineX = Math.sin(angle) * radius;
      const lineY = -Math.cos(angle) * radius;

      container
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', lineX)
        .attr('y2', lineY)
        .attr('stroke', gridColor)
        .attr('stroke-width', 1);

      // Add labels
      const labelRadius = radius + 25;
      const labelX = Math.sin(angle) * labelRadius;
      const labelY = -Math.cos(angle) * labelRadius;

      container
        .append('text')
        .attr('x', labelX)
        .attr('y', labelY)
        .text(skill.name)
        .attr('font-size', '12px')
        .attr('font-weight', '500')
        .attr('fill', theme === 'dark' ? '#fff' : '#1a1a2e')
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle');
    });

    // Create area generator
    const areaGenerator = d3
      .areaRadial<Skill>()
      .angle((d) => angleScale(d.name)! + angleScale.bandwidth() / 2)
      .innerRadius(0)
      .outerRadius((d) => radiusScale(d.level))
      .curve(d3.curveLinearClosed);

    // Draw the skill area with gradient
    const defs = svg.append('defs');
    const gradient = defs
      .append('radialGradient')
      .attr('id', 'skillGradient')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%');

    gradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#06b6d4')
      .attr('stop-opacity', 0.8);

    gradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#8b5cf6')
      .attr('stop-opacity', 0.4);

    container
      .append('path')
      .datum(skills)
      .attr('d', areaGenerator as any)
      .attr('fill', 'url(#skillGradient)')
      .attr('stroke', '#06b6d4')
      .attr('stroke-width', 2)
      .attr('opacity', 0)
      .transition()
      .duration(1000)
      .attr('opacity', 1);

    // Draw points
    skills.forEach((skill) => {
      const angle = angleScale(skill.name)! + angleScale.bandwidth() / 2;
      const pointX = Math.sin(angle) * radiusScale(skill.level);
      const pointY = -Math.cos(angle) * radiusScale(skill.level);

      container
        .append('circle')
        .attr('cx', pointX)
        .attr('cy', pointY)
        .attr('r', 0)
        .attr('fill', skill.color)
        .attr('stroke', theme === 'dark' ? '#1a1a2e' : '#fff')
        .attr('stroke-width', 2)
        .transition()
        .delay(500)
        .duration(500)
        .attr('r', 6);
    });
  }, [theme]);

  return (
    <div className="w-full max-w-md mx-auto">
      <svg ref={svgRef} className="w-full h-auto" />
    </div>
  );
}
