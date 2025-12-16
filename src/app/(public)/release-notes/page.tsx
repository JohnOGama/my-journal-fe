"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen } from "lucide-react";
import { RELEASE_NOTES_DATA } from "@/common/release-notes.constants";
import Link from "next/link";
import { ROUTES } from "@/features/route";

const ReleaseNotesPage = () => {
  const {
    version,
    releaseDate,
    overview,
    features,
    frontendTech,
    backendTech,
    devTools,
    apiFeatures,
    databaseFeatures,
  } = RELEASE_NOTES_DATA;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <BookOpen className="text-primary h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Release Notes</h1>
            <p className="text-muted-foreground mt-1">
              Version {version} - Initial Release
            </p>
          </div>
        </div>
        <Separator />
      </div>

      {/* Version Badge */}
      <div className="mb-8">
        <Badge variant="default" className="px-3 py-1 text-sm">
          v{version}
        </Badge>
        <span className="text-muted-foreground ml-3 text-sm">
          Released {releaseDate}
        </span>
      </div>

      {/* Overview */}
      <section className="mb-10 space-y-4">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p className="text-muted-foreground leading-relaxed">{overview}</p>
      </section>

      {/* Features */}
      <section className="mb-10 space-y-6">
        <h2 className="text-2xl font-semibold">✨ Features</h2>
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="bg-card rounded-lg p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-primary/10 rounded-md p-2">
                  <Icon className="text-primary h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <ul className="text-muted-foreground space-y-2">
                {feature.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="bg-primary mt-1.5 h-1.5 w-1.5 rounded-full"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>

      {/* Tech Stack */}
      <section className="mb-10 space-y-6">
        <h2 className="text-2xl font-semibold">🛠️ Tech Stack</h2>

        {/* Frontend */}
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="bg-primary/10 rounded-md p-2">
              {(() => {
                const Icon = frontendTech.icon;
                return <Icon className="text-primary h-5 w-5" />;
              })()}
            </div>
            <h3 className="text-xl font-semibold">{frontendTech.title}</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {frontendTech.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-3">
                <div>
                  <h4 className="mb-2 font-medium">{section.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {section.items.map((item, itemIndex) => (
                      <Badge key={itemIndex} variant="secondary">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Backend */}
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="bg-primary/10 rounded-md p-2">
              {(() => {
                const Icon = backendTech.icon;
                return <Icon className="text-primary h-5 w-5" />;
              })()}
            </div>
            <h3 className="text-xl font-semibold">{backendTech.title}</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {backendTech.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-3">
                <div>
                  <h4 className="mb-2 font-medium">{section.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {section.items.map((item, itemIndex) => (
                      <Badge key={itemIndex} variant="secondary">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Development Tools */}
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="bg-primary/10 rounded-md p-2">
              {(() => {
                const Icon = devTools.icon;
                return <Icon className="text-primary h-5 w-5" />;
              })()}
            </div>
            <h3 className="text-xl font-semibold">{devTools.title}</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {devTools.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-3">
                <div>
                  <h4 className="mb-2 font-medium">{section.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {section.items.map((item, itemIndex) => (
                      <Badge key={itemIndex} variant="secondary">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Features */}
      <section className="mb-10 space-y-6">
        <h2 className="text-2xl font-semibold">🔌 API Features</h2>
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <ul className="text-muted-foreground space-y-2">
            {apiFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="bg-primary mt-1.5 h-1.5 w-1.5 rounded-full"></span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: feature.replace(
                      /`([^`]+)`/g,
                      '<code class="rounded bg-muted px-1.5 py-0.5 text-xs">$1</code>',
                    ),
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Database */}
      <section className="mb-10 space-y-6">
        <h2 className="text-2xl font-semibold">💾 Database</h2>
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <ul className="text-muted-foreground space-y-2">
            {databaseFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="bg-primary mt-1.5 h-1.5 w-1.5 rounded-full"></span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <Separator className="my-8" />
      <div className="text-muted-foreground text-center text-sm">
        <p>Thank you for using My Journal!</p>
        <p className="mt-2">
          For questions or feedback, please visit the{" "}
          <Link
            target="_blank"
            href={ROUTES.CONTACT_DEVELOPER}
            className="text-primary hover:underline"
          >
            Contact Developer
          </Link>{" "}
          page.
        </p>
      </div>
    </div>
  );
};

export default ReleaseNotesPage;
