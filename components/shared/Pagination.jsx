import React from "react";
import { Button, Pagination as Pg, Icon } from "semantic-ui-react";
import { useRouter } from "next/router";

const Pagination = ({ setPage, page, totalPages }) => {
  const router = useRouter();
  const handlePaginationChange = (_, { activePage }) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: activePage,
      },
    });
  };
  return (
    <div>
      <Pg
        siblingRange="0"
        totalPages={totalPages}
        activePage={page}
        ellipsisItem={{
          content: <Icon name="ellipsis horizontal" />,
          icon: true,
        }}
        onPageChange={handlePaginationChange}
        firstItem={{
          content: <Icon name="angle double left" />,
          icon: true,
          disabled: page <= 1,
        }}
        lastItem={{
          content: <Icon name="angle double right" />,
          icon: true,
          disabled: page >= totalPages,
        }}
        prevItem={{
          content: <Icon name="angle left" />,
          icon: true,
          disabled: page <= 1,
        }}
        nextItem={{
          content: <Icon name="angle right" />,
          icon: true,
          disabled: page >= totalPages,
        }}
      />
    </div>
  );
};

export default Pagination;
