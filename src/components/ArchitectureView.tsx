import React, { useState } from 'react';
import {
  Network,
  Server,
  Shield,
  Database,
  Cpu,
  Layers,
  Cloud,
  Zap,
  Lock,
  ArrowRight,
  ExternalLink,
  Activity,
  CheckCircle2,
  GitBranch,
  Terminal,
} from 'lucide-react';

interface SubsystemInfo {
  name: string;
  category: string;
  status: 'healthy' | 'operational';
  latency: string;
  description: string;
  techStack: string;
  endpoints?: string[];
}

export const ArchitectureView: React.FC = () => {
  const [selectedSubsystem, setSelectedSubsystem] = useState<SubsystemInfo>({
    name: 'Custom Order Requests Service',
    category: 'Application Layer',
    status: 'operational',
    latency: '34ms',
    description:
      'Orchestrates artisan commissioning queues, yarn color palette validation, custom vinyl inscription limits, and 48-hour candle curing state machines.',
    techStack: 'Node.js / Express / Redis PubSub / PostgreSQL',
    endpoints: [
      'POST /api/v1/commissions/intake',
      'GET /api/v1/commissions/:id/curing-status',
      'PATCH /api/v1/commissions/:id/advance-stage',
    ],
  });

  const services = [
    {
      name: 'Client Layer',
      icon: Layers,
      items: [
        'Web Storefront (Next.js)',
        'Admin Portal (Jaipur Atelier)',
        'Artisan Mobile App (React Native)',
        'Seller & Crafter Portal',
        'Public REST / GraphQL API',
      ],
    },
    {
      name: 'Edge & Security Layer',
      icon: Shield,
      items: [
        'Cloudflare CDN & WAF',
        'Application Load Balancer (ALB)',
        'Kong API Gateway (Rate Limiting)',
        'SSL / TLS 1.3 Termination',
        'DDoS Shield Protection',
      ],
    },
    {
      name: 'Application Core Microservices',
      icon: Cpu,
      items: [
        'User & Auth Service (RBAC)',
        'Custom Order Requests Service',
        'Dual-Track Inventory Service',
        'Order & Logistics Orchestrator',
        'Payment & Billing (Razorpay)',
        'WhatsApp Notification Dispatcher',
        'Gemini AI Artisan Concierge',
      ],
    },
    {
      name: 'Data & Persistence Layer',
      icon: Database,
      items: [
        'PostgreSQL Multi-AZ (Primary DB)',
        'Redis Cluster (Sessions & Curing Timers)',
        'OpenSearch (Catalog & Text Search)',
        'AWS S3 (WIP Photos & Labels)',
      ],
    },
    {
      name: 'Async & Message Queues',
      icon: Zap,
      items: [
        'RabbitMQ / Apache Kafka Event Bus',
        'Background Workers (SLA Timers)',
        'Dead Letter Queue (DLQ)',
        'Scheduled Cron (48h Curing Audits)',
      ],
    },
    {
      name: 'External 3PL & Partner Gateways',
      icon: Cloud,
      items: [
        'Shiprocket & Delhivery (Air Waybills)',
        'Meta WhatsApp Business Cloud API',
        'Razorpay Payment Gateway (UPI Intent)',
        'Google Cloud / Gemini AI Vision & NLP',
      ],
    },
  ];

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md bg-[#fee9e5] text-[#9d3e1d] font-bold text-[11px] font-['Space_Mono'] uppercase">
              IMAGE 1 BLUEPRINT IMPLEMENTATION
            </span>
            <span className="text-xs text-[#6B5851]">
              Multi-Tenant SaaS Topology
            </span>
          </div>
          <h1 className="font-['Epilogue'] text-2xl lg:text-3xl font-bold text-[#2D221E] tracking-tight">
            DashNit & Co. — Enterprise Production Architecture
          </h1>
          <p className="text-xs lg:text-sm text-[#6B5851] mt-1 font-['Plus_Jakarta_Sans']">
            High-availability, dual-track inventory orchestrator, event-driven async message queues, and zero-trust security mesh.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EBF6F0] text-[#1E6B43] text-xs font-bold border border-[#A3D9BC]">
            <CheckCircle2 className="w-4 h-4" />
            <span>99.98% System Uptime</span>
          </span>
        </div>
      </div>

      {/* Interactive Architecture Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Schematic Layers */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((layer, idx) => {
              const Icon = layer.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm hover:border-[#9d3e1d] transition-all space-y-3"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#fee9e5] text-[#9d3e1d] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-xs uppercase tracking-wider text-[#2D221E] font-['Plus_Jakarta_Sans']">
                      {layer.name}
                    </h3>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    {layer.items.map((item, i) => (
                      <div
                        key={i}
                        onClick={() =>
                          setSelectedSubsystem({
                            name: item,
                            category: layer.name,
                            status: 'operational',
                            latency: `${Math.floor(Math.random() * 25 + 15)}ms`,
                            description: `Production component supporting ${item.toLowerCase()} operations with automated health-check heartbeats.`,
                            techStack: 'Kubernetes EKS / Cloud Native Architecture',
                            endpoints: [
                              `GET /api/v1/health/${item.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
                              `POST /api/v1/events/sync`,
                            ],
                          })
                        }
                        className="p-2 rounded-xl bg-[#FAF7F2] hover:bg-[#fee9e5] text-xs font-semibold text-[#2D221E] flex items-center justify-between cursor-pointer transition-all border border-transparent hover:border-[#F8CCA0]"
                      >
                        <span className="truncate">{item}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#9C8880] flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Security & Observability highlights */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DBD0] space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#6B5851]">
              Production-Grade Security & Observability Highlights
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-[#E5DBD0]">
                <span className="text-[10px] text-[#9C8880] block">Encryption</span>
                <span className="font-bold text-[#2D221E]">TLS 1.3 + AES-256</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#E5DBD0]">
                <span className="text-[10px] text-[#9C8880] block">Auth Protocol</span>
                <span className="font-bold text-[#2D221E]">OAuth2 + JWT (RBAC)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#E5DBD0]">
                <span className="text-[10px] text-[#9C8880] block">Monitoring</span>
                <span className="font-bold text-[#2D221E]">Prometheus & Grafana</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#E5DBD0]">
                <span className="text-[10px] text-[#9C8880] block">Backup Policy</span>
                <span className="font-bold text-[#2D221E]">Point-in-Time (PITR)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Live Inspector */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white border border-[#E5DBD0] shadow-sm space-y-4 sticky top-24">
            <div className="flex items-center justify-between border-b border-[#F3EDE4] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9d3e1d] font-['Space_Mono']">
                  {selectedSubsystem.category}
                </span>
                <h3 className="font-['Epilogue'] text-base font-bold text-[#2D221E] mt-0.5">
                  {selectedSubsystem.name}
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#EBF6F0] text-[#1E6B43] text-[10px] font-bold border border-[#A3D9BC]">
                Active
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#6B5851] block mb-1">
                  Component Overview
                </span>
                <p className="text-xs text-[#2D221E] leading-relaxed">
                  {selectedSubsystem.description}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DBD0] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[#6B5851]">Health Status</span>
                  <span className="font-bold text-[#1E6B43] flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#1E6B43] animate-pulse"></span>
                    Operational
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B5851]">p99 Latency</span>
                  <span className="font-['Space_Mono'] font-bold text-[#2D221E]">
                    {selectedSubsystem.latency}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B5851]">Tech Stack</span>
                  <span className="font-semibold text-[#9d3e1d] text-[11px] truncate max-w-[150px]">
                    {selectedSubsystem.techStack}
                  </span>
                </div>
              </div>

              {selectedSubsystem.endpoints && (
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#6B5851] block mb-1.5">
                    Sample API Endpoints
                  </span>
                  <div className="space-y-1 font-['Space_Mono'] text-[10px]">
                    {selectedSubsystem.endpoints.map((ep, idx) => (
                      <div
                        key={idx}
                        className="p-1.5 rounded bg-[#2D221E] text-[#F3EDE4] truncate"
                      >
                        {ep}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-[#F3EDE4]">
              <div className="p-3 rounded-xl bg-[#fee9e5]/60 text-xs text-[#9d3e1d] space-y-1">
                <span className="font-bold block">Artisan Queue Integration</span>
                <p className="text-[11px] text-[#6B5851]">
                  Directly linked to the Jaipur Craft House Kanban queue with real-time websocket broadcasts to artisan tablets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
