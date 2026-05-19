import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";

const WORK_EXPERIENCE_QUERY = `*[
  _type == "workExperience"
]{ _id, companyName, jobTitle, subtitle, details, startDate, endDate }`;
//]|order(endDate desc)[0...12]{_id, companyName, jobTitle, subtitle, startDate, endDate}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const experiences = await client.fetch<SanityDocument[]>(
    WORK_EXPERIENCE_QUERY,
    {},
    options,
  );

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Work Experience</h1>
      {experiences.map((experience) => (
        <div key={experience._id}>
          <h2 className="text-xl font-semibold">{experience.companyName}</h2>
          <p>
            {experience.jobTitle && `${experience.jobTitle}, `}
            {experience.subtitle}
          </p>
          <p>
            {experience.startDate} to {experience.endDate}
          </p>
        </div>
      ))}
    </main>
  );
}
