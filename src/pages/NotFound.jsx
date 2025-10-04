import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  AlertTriangle, 
  Home, 
  ArrowLeft, 
  Satellite,
  Rocket
} from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-950/10 flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-quantum-blue to-stellar-cyan rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-plasma-orange to-destructive rounded-full blur-2xl animate-float-gentle" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <Card className="bg-card/60 border-border/50 backdrop-blur-xl shadow-command">
          <CardContent className="p-12">
            {/* Error Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="p-4 rounded-full bg-gradient-to-br from-destructive to-plasma-orange shadow-command">
                  <AlertTriangle className="w-16 h-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Satellite className="w-6 h-6 text-quantum-blue animate-pulse-glow" />
                </div>
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-6xl sm:text-8xl font-bold mb-4">
              <span className="bg-gradient-to-r from-destructive via-plasma-orange to-quantum-blue bg-clip-text text-transparent">
                404
              </span>
            </h1>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-quantum-blue mb-4">
              Mission Target Not Found
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              The coordinates you are looking for seem to be lost in space. 
              The page may have been moved, deleted, or never existed in our 
              <span className="text-quantum-blue font-medium"> mission database</span>.
            </p>

            {/* Mission Status */}
            <div className="mb-8 p-4 bg-muted/20 rounded-lg border border-border/30">
              <div className="flex items-center justify-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-plasma-orange rounded-full animate-pulse" />
                <span className="text-muted-foreground">
                  <strong className="text-plasma-orange">STATUS:</strong> Navigation Error - Recalibrating Course
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
              <Link to="/">
                <Button className="bg-gradient-quantum hover:shadow-command transition-all duration-300 h-12 px-8 group">
                  <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Return to Base
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                onClick={() => window.history.back()}
                className="border-quantum-blue/50 text-quantum-blue hover:bg-quantum-blue/10 h-12 px-8 group"
              >
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Previous Location
              </Button>
            </div>

            {/* Quick Navigation */}
            <div className="mt-8 pt-6 border-t border-border/30">
              <p className="text-sm text-muted-foreground mb-4">
                Or navigate to a specific mission module:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { name: "Simulation", href: "/simulation", icon: Rocket },
                  { name: "Defense", href: "/defense", icon: AlertTriangle },
                  { name: "Education", href: "/education", icon: Satellite }
                ].map((link) => (
                  <Link key={link.name} to={link.href}>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-quantum-blue hover:bg-quantum-blue/10 border border-quantum-blue/20"
                    >
                      <link.icon className="w-4 h-4 mr-2" />
                      {link.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>

            {/* Fun Easter Egg */}
            <div className="mt-8 text-xs text-muted-foreground">
              <p>
                In space, no one can hear you scream... about broken links. 
                <br />
                <span className="text-quantum-blue">- AstroGuard Mission Control</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;