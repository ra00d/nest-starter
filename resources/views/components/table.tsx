import { MjmlColumn, MjmlSection, MjmlTable } from '@faire/mjml-react';

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

const tableHeader = (headings) => {
  return (
    <thead>
      <tr>
        {headings.map((h, i) => (
          <th key={i}>{toTitleCase(h)}</th>
        ))}
      </tr>
    </thead>
  );
};
export const MailmanTable = (payload: Record<string, any>) => {
  const headings = Object.keys(payload.value[0]);

  if (payload.vertical) {
    return (
      <>
        {payload.value.map((obj, i) => {
          const values = Object.values(obj) as string[];
          return (
            <MjmlSection key={i} padding={0}>
              <MjmlColumn>
                <MjmlTable className="styled-table">
                  <tbody>
                    {values.map((v, index) => (
                      <tr key={index}>
                        <th>{toTitleCase(headings[index])}</th>
                        <td>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </MjmlTable>
              </MjmlColumn>
            </MjmlSection>
          );
        })}
      </>
    );
  } else {
    return (
      <MjmlSection padding={0}>
        <MjmlColumn>
          <MjmlTable className="styled-table">
            {payload.heading && tableHeader(headings)}
            <tbody>
              {payload.value.map((obj) => {
                const values = Object.values(obj) as string[];
                return (
                  <tr>
                    {values.map((v) => (
                      <td>{v}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </MjmlTable>
        </MjmlColumn>
      </MjmlSection>
    );
  }
};
