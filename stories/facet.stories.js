import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { Elasticsearch, SearchBox, Results, Facet } from "../src";
import { url } from "./utils";

function CollapsableFacet({ initialCollapsed, title, ...rest }) {
  const [collapsed, setCollapsed] = useState(true);

  function FacetWrapper() {
    if (!collapsed) {
      return <Facet {...rest} />;
    }
    return <div />;
  }
  return (
    <div>
      <div>
        {title}
        <button
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        >
          open
        </button>
      </div>
      {FacetWrapper()}
    </div>
  );
}

storiesOf("Facet", module)
  .add("collapsable", () => {
    return (
      <Elasticsearch url={url}>
        <SearchBox id="main" fields={["TICO"]} />
        <CollapsableFacet id="autr" fields={["AUTR.keyword"]} />
        <Results
          id="result"
          item={(s, _t, id) => (
            <div key={id}>
              {s.TICO} - {s.AUTR}
            </div>
          )}
          pagination={() => <></>}
        />
      </Elasticsearch>
    );
  })
  .add("customized", () => {
    return (
      <Elasticsearch url={url}>
        <Facet
          seeMore="SEE MORE CUSTOM"
          placeholder="MY PLACEHOLDER"
          id="autr"
          fields={["AUTR.keyword"]}
          itemsPerBlock={10}
        />
        <Results
          id="result"
          item={(source, score, id) => (
            <div key={id}>
              <b>{source.TICO}</b> - score: {score}
            </div>
          )}
        />
      </Elasticsearch>
    );
  })
  .add("modify filter value", () => {
    return (
      <Elasticsearch url={url}>
        <Facet
          filterValueModifier={v => `${v}.*`}
          placeholder="type first letters"
          id="autr"
          fields={["AUTR.keyword"]}
        />
        <Results
          id="result"
          item={(source, score, id) => (
            <div key={id}>
              <b>{source.TICO}</b> - score: {score}
            </div>
          )}
        />
      </Elasticsearch>
    );
  })
  .add("test", () => {
    return (
      <Elasticsearch url={url} style={{ display: "flex" }}>
        <div>
          <Facet
            seeMore="SEE MORE CUSTOM"
            placeholder="DENO"
            id="deno"
            fields={["DENO.keyword"]}
            itemsPerBlock={10}
            react={["main"]}
          />
          <Facet
            seeMore="SEE MORE CUSTOM"
            placeholder="PRODUCTEUR"
            id="prod"
            fields={["PRODUCTEUR.keyword"]}
            itemsPerBlock={10}
            react={["main"]}
          />
          <Facet
            seeMore="SEE MORE CUSTOM"
            placeholder="AUTP"
            id="autp"
            fields={["AUTP.keyword"]}
            itemsPerBlock={10}
            react={["main"]}
          />
        </div>
        <div>
          <div style={{ paddingBottom: "20px" }}>
            <SearchBox id="main" fields={["TICO"]} />
          </div>
          <Results
            id="result"
            item={(source, score, id) => (
              <div key={id}>
                <b>{source.TICO}</b>- score: {score}
              </div>
            )}
            pagination={() => <div />}
            react={["autp", "main", "prod", "deno"]}
          />
        </div>
      </Elasticsearch>
    );
  });
