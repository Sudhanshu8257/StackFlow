import React from "react";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import Filter from "@/components/shared/Filter";
import { TagFilters } from "@/constants/filters";
import Link from "next/link";
import NoResult from "@/components/shared/NoResult";
import { getAllTags } from "@/lib/actions/tag.action";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/Pagination";
const Page = async ({ searchParams }: SearchParamsProps) => {
  const tagsResults = await getAllTags({
    searchQuery: searchParams.q,
    page: searchParams.page ? +searchParams.page : 1,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Tags</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/tags"
          iconPosition="left"
          placeholder="Search for tags"
          imgSrc="/assets/icons/search.svg"
          otherClasses="flex-1"
        />
        <Filter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap justify-center gap-4">
        {tagsResults.tags.length > 0 ? (
          tagsResults.tags.map((tag) => (
            <Link
              key={tag._id}
              href={`/tags/${tag._id}`}
              className="shadow-light100_darknone"
            >
              <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px] ">
                <div className=" background-light800_dark400 w-fit rounded-md px-5 py-1.5">
                  <p className="paragraph-semibold text-dark300_light900 capitalize">
                    {tag.name}
                  </p>
                </div>

                <p className="small-medium text-dark400_light500 mt-3.5">
                  <span className="body-semibold primary-text-gradient mr-2.5">
                    {tag.questions.length}+{" "}
                  </span>
                  Questions
                </p>
              </article>
            </Link>
          ))
        ) : (
          <NoResult
            title="No Tags Found"
            description="Seems like the tag forest is barren, let's plant some seed"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </section>
      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={tagsResults.isNext}
      />
    </>
  );
};

export default Page;
