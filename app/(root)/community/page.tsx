import React from "react";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import Filter from "@/components/shared/Filter";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import Link from "next/link";
import UserCard from "@/components/cards/UserCard";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/Pagination";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community | Stack Flow",
  description:
    "Discover the diverse and talented community of developers at Stack Flow. Our platform brings together a global network of users passionate about coding, programming, and technology. Explore profiles, connect with fellow developers, and engage in conversations with individuals who share your interests. Join the vibrant Stack Flow community where knowledge is shared, questions are answered, and connections are made.",
};

const Page = async ({ searchParams }: SearchParamsProps) => {
  const userResults = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/community"
          iconPosition="left"
          placeholder="Search for amazing minds"
          imgSrc="/assets/icons/search.svg"
          otherClasses="flex-1"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {userResults.users.length > 0 ? (
          userResults.users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No Users Yet</p>
            <Link
              href={"/sign-up"}
              className="mt-2 font-bold text-accent-blue "
            >
              Join to be the first
            </Link>
          </div>
        )}
      </section>
      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={userResults.isNext}
      />
    </>
  );
};

export default Page;
