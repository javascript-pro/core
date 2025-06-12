// core/gl-core/cartridges/Fallmanager/lib/getIconByExtension.tsx

export const getIconByExtension = (fileExtension: string) => {

  const fileTypes = [
    {
      slug: ".pdf",
      icon: "pdf",
      title: "PDF",
      description: "Portable Document Format"
    },
    {
      slug: ".odt",
      icon: "odt",
      title: "ODT",
      description: "Open Document Text"
    },
    {
      slug: ".txt",
      icon: "txt",
      title: "Plain Text"
    },
    {
      slug: ".rtf",
      icon: "rtf",
      title: "Rich Text Format"
    },
    {
      slug: ".md",
      icon: "md",
      title: "Markdown"
    },
    {
      slug: ".doc",
      icon: "docx",
      title: "Word",
      description: "Microsoft Word Document"
    },
    {
      slug: ".docx",
      icon: "docx",
      title: "Word",
      description: "Microsoft Word Document"
    },
    {
      slug: ".jpg",
      icon: "jpg",
      title: "JPG",
      description: "Joint Photographic Experts Group"
    },
    {
      slug: ".jpeg",
      icon: "jpg",
      title: "JPG",
      description: "Joint Photographic Experts Group"
    },
    {
      slug: ".png",
      icon: "png",
      title: "PNG",
      description: "Portable Network Graphics"
    }
  ];

  const normalized = fileExtension.toLowerCase().startsWith(".")
    ? fileExtension.toLowerCase()
    : `.${fileExtension.toLowerCase()}`;

  const match = fileTypes.find(type => type.slug === normalized);

  return match || {
    extension: normalized,
    icon: "unknown",
    title: "Unknown",
    description: "Unsupported file type"
  };
};
