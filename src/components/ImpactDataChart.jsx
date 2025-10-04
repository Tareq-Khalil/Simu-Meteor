import { useEffect, useRef, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Zap, 
  Globe, 
  AlertTriangle,
  Eye,
  EyeOff,
  Target,
  Settings,
  Info
} from "lucide-react";

const ImpactDataChart = forwardRef(({ 
  data, 
  width = 500, 
  height = 350 
}, ref) => {
  const svgRef = useRef(null);
  const chartContainerRef = useRef(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    if (!data || !svgRef.current || !chartContainerRef.current) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove();

    const containerWidth = chartContainerRef.current.clientWidth;
    const containerHeight = height;

    // Responsive dimensions
    const isSmallScreen = containerWidth < 640;
    const margin = { 
      top: 30, 
      right: isSmallScreen ? 20 : 40, 
      bottom: isSmallScreen ? 50 : 70, 
      left: isSmallScreen ? 70 : 90 
    };
    const chartWidth = Math.max(200, containerWidth - margin.left - margin.right);
    const chartHeight = Math.max(150, containerHeight - margin.top - margin.bottom);

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', containerWidth)
      .attr('height', containerHeight);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Professional space theme colors
    const chartData = [
      { 
        category: 'Energy', 
        value: Math.max(0.1, data.kineticEnergy / 1e15), 
        unit: 'PJ',
        color: '#00bcd4', // stellar-cyan
        bgColor: 'rgba(0, 188, 212, 0.1)',
        description: 'Kinetic Energy Released'
      },
      { 
        category: 'Crater', 
        value: Math.max(0.1, data.craterSize), 
        unit: 'km',
        color: '#ff6b35', // plasma-orange
        bgColor: 'rgba(255, 107, 53, 0.1)',
        description: 'Impact Crater Diameter'
      },
      { 
        category: 'Magnitude', 
        value: Math.max(1, data.earthquakeMagnitude), 
        unit: '',
        color: '#6366f1', // quantum-blue
        bgColor: 'rgba(99, 102, 241, 0.1)',
        description: 'Seismic Magnitude'
      }
    ];

    // Set up scales with better responsive handling
    const xScale = d3.scaleBand()
      .domain(chartData.map(d => d.category))
      .range([0, chartWidth])
      .padding(isSmallScreen ? 0.3 : 0.4);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(chartData, d => d.value) * 1.2 || 1])
      .range([chartHeight, 0]);

    // Create enhanced gradients and effects
    const defs = svg.append('defs');
    
    chartData.forEach((d, i) => {
      // Professional gradient
      const gradient = defs.append('linearGradient')
        .attr('id', `gradient-${i}`)
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', 0).attr('y1', chartHeight)
        .attr('x2', 0).attr('y2', 0);
      
      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', d.color)
        .attr('stop-opacity', 0.7);
      
      gradient.append('stop')
        .attr('offset', '50%')
        .attr('stop-color', d.color)
        .attr('stop-opacity', 0.9);
      
      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', d.color)
        .attr('stop-opacity', 1);

      // Professional glow effect
      const filter = defs.append('filter')
        .attr('id', `glow-${i}`)
        .attr('x', '-50%')
        .attr('y', '-50%')
        .attr('width', '200%')
        .attr('height', '200%');

      filter.append('feGaussianBlur')
        .attr('stdDeviation', '4')
        .attr('result', 'coloredBlur');

      const feMerge = filter.append('feMerge');
      feMerge.append('feMergeNode').attr('in', 'coloredBlur');
      feMerge.append('feMergeNode').attr('in', 'SourceGraphic');
    });

    // Add professional bars with enhanced styling
    const bars = g.selectAll('.bar')
      .data(chartData)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.category) || 0)
      .attr('width', Math.max(20, xScale.bandwidth()))
      .attr('y', chartHeight)
      .attr('height', 0)
      .attr('fill', (d, i) => `url(#gradient-${i})`)
      .attr('rx', isSmallScreen ? 6 : 10)
      .attr('ry', isSmallScreen ? 6 : 10)
      .style('filter', (d, i) => `url(#glow-${i})`)
      .style('cursor', 'pointer')
      .style('stroke', (d) => d.color)
      .style('stroke-width', '2')
      .style('stroke-opacity', '0.5');

    // Professional animation
    bars.transition()
      .duration(1500)
      .delay((d, i) => i * 400)
      .ease(d3.easeBackOut.overshoot(1.2))
      .attr('y', d => yScale(d.value))
      .attr('height', d => Math.max(2, chartHeight - yScale(d.value)));

    // Enhanced hover effects with professional tooltips
    bars.on('mouseover', function(event, d) {
      d3.select(this)
        .transition()
        .duration(300)
        .style('stroke-opacity', '1 ')
        .style('transform', 'scale(1)');
      
      // Professional tooltip positioning
      const barX = (xScale(d.category) || 0) + xScale.bandwidth() / 2;
      const barY = yScale(d.value);
      
      const tooltipWidth = isSmallScreen ? 140 : 180;
      const tooltipHeight = isSmallScreen ? 50 : 70;
      
      let tooltipX = barX;
      let tooltipY = barY - 30;
      
      // Smart positioning to stay within bounds
      if (tooltipX - tooltipWidth/2 < 0) tooltipX = tooltipWidth/2;
      if (tooltipX + tooltipWidth/2 > chartWidth) tooltipX = chartWidth - tooltipWidth/2;
      if (tooltipY - tooltipHeight < 0) tooltipY = barY + 50;
      
      const tooltip = g.append('g')
        .attr('class', 'tooltip')
        .attr('transform', `translate(${tooltipX}, ${tooltipY})`);
      
      // Professional tooltip background
      const tooltipBg = tooltip.append('rect')
        .attr('x', -tooltipWidth/2)
        .attr('y', -tooltipHeight/2)
        .attr('width', tooltipWidth)
        .attr('height', tooltipHeight)
        .attr('rx', 12)
        .attr('ry', 12)
        .attr('fill', 'rgba(15, 23, 42, 0.95)')
        .attr('stroke', d.color)
        .attr('stroke-width', 2)
        .style('filter', 'drop-shadow(0px 8px 24px rgba(0,0,0,0.4))')
        .style('opacity', 0);

      // Smooth tooltip animation
      tooltipBg.transition()
        .duration(300)
        .style('opacity', 1);

      g.select('.tooltip').remove();
    });

    // Professional axis styling
    const xAxis = d3.axisBottom(xScale);
    const xAxisGroup = g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(xAxis);

    xAxisGroup.selectAll('text')
      .attr('fill', '#cbd5e1')
      .attr('font-size', isSmallScreen ? '11px' : '14px')
      .attr('font-weight', '600')
      .style('text-anchor', 'middle');

    // Enhanced y-axis
    const yAxisTicks = isSmallScreen ? 4 : 6;
    const yAxis = d3.axisLeft(yScale)
      .ticks(yAxisTicks)
      .tickFormat(d => {
        if (d >= 1000) return `${(d/1000).toFixed(1)}k`;
        if (d >= 100) return d.toFixed(0);
        return d.toFixed(1);
      });
      
    const yAxisGroup = g.append('g')
      .attr('class', 'y-axis')
      .call(yAxis);

    yAxisGroup.selectAll('text')
      .attr('fill', '#94a3b8')
      .attr('font-size', isSmallScreen ? '10px' : '12px')
      .attr('font-weight', '500');

    // Professional axis styling
    g.selectAll('.domain')
      .attr('stroke', '#475569')
      .attr('stroke-width', 2);
    
    g.selectAll('.tick line')
      .attr('stroke', '#475569')
      .attr('stroke-width', 1.5);

    // Enhanced grid lines
    g.selectAll('.grid-line')
      .data(yScale.ticks(yAxisTicks))
      .enter().append('line')
      .attr('class', 'grid-line')
      .attr('x1', 0)
      .attr('x2', chartWidth)
      .attr('y1', d => yScale(d))
      .attr('y2', d => yScale(d))
      .attr('stroke', '#334155')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '4,4')
      .attr('opacity', 0.4);

    // Professional value labels
    g.selectAll('.bar-label')
      .data(chartData)
      .enter().append('text')
      .attr('class', 'bar-label')
      .attr('x', d => (xScale(d.category) || 0) + xScale.bandwidth() / 2)
      .attr('y', chartHeight + (isSmallScreen ? 25 : 30))
      .attr('text-anchor', 'middle')
      .attr('fill', '#e2e8f0')
      .attr('font-size', isSmallScreen ? '12px' : '15px')
      .attr('font-weight', '700')
      .text(d => `${d.value.toFixed(1)}${d.unit}`)
      .style('opacity', 0)
      .transition()
      .duration(1500)
      .delay((d, i) => i * 400 + 800)
      .style('opacity', 1)
      .attr('y', d => Math.max(20, yScale(d.value) - (isSmallScreen ? 8 : 12)));

  }, [data, width, height, activeTab]);

  // Enhanced professional timeline chart
  const createTimelineChart = () => {
    if (!data) return null;

    const timelineData = [
      { 
        time: '0s', 
        event: 'Impact Event', 
        intensity: 100, 
        color: '#6366f1', // quantum-blue
        bgColor: 'rgba(99, 102, 241, 0.1)',
        description: 'Initial asteroid collision with Earth surface'
      },
      { 
        time: '1min', 
        event: 'Shockwave Propagation', 
        intensity: 85, 
        color: '#ff6b35', // plasma-orange
        bgColor: 'rgba(255, 107, 53, 0.1)',
        description: 'Seismic waves propagate from impact epicenter'
      },
      { 
        time: '10min', 
        event: 'Ejecta Fallback', 
        intensity: 65, 
        color: '#00bcd4', // stellar-cyan
        bgColor: 'rgba(0, 188, 212, 0.1)',
        description: 'Debris and molten material begins to fall'
      },
      { 
        time: '1hr', 
        event: 'Seismic Activity', 
        intensity: 45, 
        color: '#10b981', // mission-green
        bgColor: 'rgba(16, 185, 129, 0.1)',
        description: 'Secondary earthquakes triggered globally'
      },
      { 
        time: '24hr', 
        event: 'Climate Effects', 
        intensity: 25, 
        color: '#8b5cf6', // purple
        bgColor: 'rgba(139, 92, 246, 0.1)',
        description: 'Atmospheric dust begins affecting climate'
      }
    ];

    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 rounded-lg bg-gradient-quantum">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h4 className="text-lg font-bold text-quantum-blue">Impact Timeline Analysis</h4>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          {timelineData.map((item, index) => (
            <div 
              key={index} 
              className="group hover:shadow-command p-4 rounded-lg border border-border/50 transition-all duration-300 hover:scale-[1.02]"
              style={{ backgroundColor: item.bgColor }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="w-full sm:w-20 flex-shrink-0">
                  <div className="text-center p-2 rounded-lg border-2" style={{ borderColor: item.color }}>
                    <div className="text-sm font-bold" style={{ color: item.color }}>
                      {item.time}
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 space-y-2 sm:space-y-0">
                    <h5 className="text-base font-bold text-quantum-blue truncate">{item.event}</h5>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-muted-foreground">
                        Intensity: {item.intensity}%
                      </span>
                      <Badge 
                        className="text-xs px-3 py-1"
                        style={{ 
                          backgroundColor: item.color, 
                          color: 'white',
                          border: 'none'
                        }}
                      >
                        Active
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="w-full bg-muted/30 rounded-full h-3 mb-3 overflow-hidden">
                    <div 
                      className="h-3 rounded-full transition-all duration-1500 delay-300 relative overflow-hidden"
                      style={{ 
                        width: `${item.intensity}%`,
                        backgroundColor: item.color,
                        boxShadow: `0 0 15px ${item.color}60`
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 animate-pulse" />
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Smart number formatting
  const formatNumber = (value, type = 'default') => {
    if (!value) return '0';
    
    const num = parseFloat(value);
    
    switch (type) {
      case 'currency':
        if (num >= 1e12) return `$${(num / 1e12).toFixed(1)}T`;
        if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
        if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
        if (num >= 1e3) return `$${(num / 1e3).toFixed(0)}K`;
        return `$${num.toFixed(0)}`;
      
      case 'casualties':
        if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
        if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
        if (num >= 1e3) return `${(num / 1e3).toFixed(0)}K`;
        return num.toLocaleString();
      
      case 'area':
        if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M km²`;
        if (num >= 1e3) return `${(num / 1e3).toFixed(0)}K km²`;
        return `${num.toLocaleString()} km²`;
      
      default:
        if (num >= 1e12) return `${(num / 1e12).toFixed(1)}T`;
        if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
        if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
        if (num >= 1e3) return `${(num / 1e3).toFixed(0)}K`;
        return num.toLocaleString();
    }
  };

  // Enhanced professional damage breakdown
  const createDamageBreakdown = () => {
    if (!data) return null;

    const damageCategories = [
      {
        category: 'Infrastructure',
        percentage: 35,
        cost: data.damage.economicLoss * 0.35,
        color: '#6366f1', // quantum-blue
        bgColor: 'rgba(99, 102, 241, 0.1)',
        icon: '🏗️',
        description: 'Buildings, roads, utilities'
      },
      {
        category: 'Environmental',
        percentage: 25,
        cost: data.damage.economicLoss * 0.25,
        color: '#10b981', // mission-green
        bgColor: 'rgba(16, 185, 129, 0.1)',
        icon: '🌍',
        description: 'Ecosystem disruption'
      },
      {
        category: 'Economic',
        percentage: 20,
        cost: data.damage.economicLoss * 0.20,
        color: '#ff6b35', // plasma-orange
        bgColor: 'rgba(255, 107, 53, 0.1)',
        icon: '💰',
        description: 'Market losses, trade'
      },
      {
        category: 'Agricultural',
        percentage: 15,
        cost: data.damage.economicLoss * 0.15,
        color: '#00bcd4', // stellar-cyan
        bgColor: 'rgba(0, 188, 212, 0.1)',
        icon: '🌾',
        description: 'Crop damage, livestock'
      },
      {
        category: 'Other',
        percentage: 5,
        cost: data.damage.economicLoss * 0.05,
        color: '#8b5cf6', // purple
        bgColor: 'rgba(139, 92, 246, 0.1)',
        icon: '📊',
        description: 'Miscellaneous impacts'
      }
    ];

    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 rounded-lg bg-gradient-quantum">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <h4 className="text-lg font-bold text-quantum-blue">Damage Assessment Breakdown</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {damageCategories.map((item, index) => (
            <Card 
              key={index}
              className="bg-card/60 border-border/50 backdrop-blur-sm shadow-command hover:shadow-glow transition-all duration-300 hover:scale-[1.02]"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-4 gap-3">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div 
                      className="p-2 rounded-lg text-xl flex-shrink-0"
                      style={{ backgroundColor: item.bgColor }}
                    >
                      {item.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h5 className="text-sm font-bold text-quantum-blue truncate">{item.category}</h5>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-lg font-bold" style={{ color: item.color }}>
                      {item.percentage}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatNumber(item.cost, 'currency')}
                    </div>
                  </div>
                </div>
                
                <div className="w-full bg-muted/30 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-3 rounded-full transition-all duration-1500 delay-300 relative overflow-hidden"
                    style={{ 
                      width: `${item.percentage}%`,
                      backgroundColor: item.color,
                      boxShadow: `0 0 10px ${item.color}50`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div ref={ref} className="w-full max-w-full space-y-4 sm:space-y-6">
      <Card className="bg-card/60 border-border/50 backdrop-blur-sm shadow-command w-full">
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="p-3 rounded-lg bg-gradient-quantum flex-shrink-0">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xl font-bold text-quantum-blue">Impact Analytics</span>
                <div className="text-sm text-muted-foreground font-normal">
                  Comprehensive damage assessment and analysis
                </div>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowComparison(!showComparison)}
              className="border-border hover:text-quantum-blue hover:border-blue hover:bg-quantum-blue/5 w-full sm:w-auto flex-shrink-0 transition-all duration-300"
            >
              {showComparison ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showComparison ? 'Hide' : 'Show'} Details
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="px-3 sm:px-6 w-full">
          {data ? (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6 w-full">
              <TabsList className="grid w-full grid-cols-3 bg-card/60 border-border/50 backdrop-blur-sm h-auto p-1">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-gradient-quantum data-[state=active]:text-white text-xs sm:text-sm py-3 h-12"
                >
                  <Target className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Overview</span>
                  <span className="sm:hidden">Data</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="timeline" 
                  className="data-[state=active]:bg-gradient-quantum data-[state=active]:text-white text-xs sm:text-sm py-3 h-12"
                >
                  <TrendingUp className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Timeline</span>
                  <span className="sm:hidden">Time</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="breakdown" 
                  className="data-[state=active]:bg-gradient-quantum data-[state=active]:text-white text-xs sm:text-sm py-3 h-12"
                >
                  <Settings className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Breakdown</span>
                  <span className="sm:hidden">Info</span>
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4 sm:space-y-6 w-full">
                <div ref={chartContainerRef} className="w-full min-h-[300px] sm:min-h-[350px] overflow-hidden bg-muted/10 rounded-lg border border-border/30 p-4">
                  <svg ref={svgRef} className="w-full h-full"></svg>
                </div>

                {/* Enhanced Key Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                  <Card className="bg-stellar-cyan/10 border-stellar-cyan/20 backdrop-blur-sm">
                    <CardContent className="p-4 text-center">
                      <div className="p-3 rounded-full bg-gradient-to-br from-stellar-cyan to-quantum-blue w-fit mx-auto mb-3">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-stellar-cyan mb-1">
                        {(data.kineticEnergy / 1e15).toFixed(1)} PJ
                      </div>
                      <div className="text-sm text-muted-foreground">Kinetic Energy Released</div>
                      <div className="text-xs text-stellar-cyan mt-1 font-medium">
                        Equivalent to {((data.kineticEnergy / 1e15) * 0.24).toFixed(1)} megatons TNT
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-plasma-orange/10 border-plasma-orange/20 backdrop-blur-sm">
                    <CardContent className="p-4 text-center">
                      <div className="p-3 rounded-full bg-gradient-to-br from-plasma-orange to-destructive w-fit mx-auto mb-3">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-plasma-orange mb-1">
                        {data.craterSize.toFixed(1)} km
                      </div>
                      <div className="text-sm text-muted-foreground">Impact Crater Diameter</div>
                      <div className="text-xs text-plasma-orange mt-1 font-medium">
                        Area: {(Math.PI * Math.pow(data.craterSize/2, 2)).toFixed(0)} km²
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-quantum-blue/10 border-quantum-blue/20 backdrop-blur-sm">
                    <CardContent className="p-4 text-center">
                      <div className="p-3 rounded-full bg-gradient-to-br from-quantum-blue to-stellar-cyan w-fit mx-auto mb-3">
                        <Activity className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-quantum-blue mb-1">
                        {data.earthquakeMagnitude.toFixed(1)}
                      </div>
                      <div className="text-sm text-muted-foreground">Seismic Magnitude</div>
                      <div className="text-xs text-quantum-blue mt-1 font-medium">
                        {data.earthquakeMagnitude >= 7 ? 'Major' : data.earthquakeMagnitude >= 6 ? 'Strong' : 'Moderate'} Earthquake
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Enhanced Damage Summary */}
                {showComparison && (
                  <div className="space-y-4">
                    <Separator className="my-4" />
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 rounded-lg bg-gradient-quantum">
                        <Info className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-quantum-blue">Damage Assessment Summary</h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Card className="bg-destructive/10 border-destructive/20 backdrop-blur-sm">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
                            <span className="text-sm font-bold text-destructive">Human Impact</span>
                          </div>
                          <div className="text-xl font-bold text-destructive mb-1">
                            {formatNumber(data.damage.casualties, 'casualties')}
                          </div>
                          <div className="text-xs text-muted-foreground">Estimated casualties</div>
                          <div className="mt-2 w-full bg-muted/30 rounded-full h-2">
                            <div className="h-2 bg-destructive rounded-full w-full opacity-80" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-plasma-orange/10 border-plasma-orange/20 backdrop-blur-sm">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="text-plasma-orange text-lg">💰</span>
                            <span className="text-sm font-bold text-plasma-orange">Economic Impact</span>
                          </div>
                          <div className="text-xl font-bold text-plasma-orange mb-1">
                            {formatNumber(data.damage.economicLoss, 'currency')}
                          </div>
                          <div className="text-xs text-muted-foreground">Total economic losses</div>
                          <div className="mt-2 w-full bg-muted/30 rounded-full h-2">
                            <div className="h-2 bg-plasma-orange rounded-full w-4/5 opacity-80" />
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-mission-green/10 border-mission-green/20 backdrop-blur-sm">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <Globe className="w-5 h-5 text-mission-green flex-shrink-0" />
                            <span className="text-sm font-bold text-mission-green">Geographic Impact</span>
                          </div>
                          <div className="text-xl font-bold text-mission-green mb-1">
                            {formatNumber(data.damage.affectedArea, 'area')}
                          </div>
                          <div className="text-xs text-muted-foreground">Affected area</div>
                          <div className="mt-2 w-full bg-muted/30 rounded-full h-2">
                            <div className="h-2 bg-mission-green rounded-full w-3/5 opacity-80" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Timeline Tab */}
              <TabsContent value="timeline" className="w-full">
                {createTimelineChart()}
              </TabsContent>

              {/* Breakdown Tab */}
              <TabsContent value="breakdown" className="w-full">
                {createDamageBreakdown()}
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="bg-card/60 border-border/50 backdrop-blur-sm shadow-command">
              <CardContent className="text-center py-12 w-full">
                <div className="p-4 rounded-full bg-gradient-quantum w-fit mx-auto mb-6">
                  <BarChart3 className="w-16 h-16 text-white animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-quantum-blue mb-3">Analytics Ready</h3>
                <p className="text-muted-foreground px-4 max-w-md mx-auto">
                  Run a simulation to generate comprehensive impact metrics, damage assessments, and timeline analysis
                </p>
                <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <Target className="w-4 h-4" />
                  <span>Professional data visualization awaits your input</span>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
});

ImpactDataChart.displayName = "ImpactDataChart";

ImpactDataChart.propTypes = {
  data: PropTypes.shape({   
    kineticEnergy: PropTypes.number.isRequired,
    craterSize: PropTypes.number.isRequired,
    earthquakeMagnitude: PropTypes.number.isRequired,
    damage: PropTypes.shape({
      economicLoss: PropTypes.number.isRequired,
      casualties: PropTypes.number.isRequired,
      affectedArea: PropTypes.number.isRequired
    }).isRequired
  }),
  width: PropTypes.number,
  height: PropTypes.number
};

export default ImpactDataChart;