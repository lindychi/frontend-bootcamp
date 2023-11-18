import React from "react";

type Props = { title: string };

export default function CatalogBadge({ title }: Props) {
  return (
    <div className="h-8 times-center p-1 px-2 bg-zinc-500/80 text-white rounded-md active:bg-zinc-100/30">
      {title}
    </div>
  );
}
