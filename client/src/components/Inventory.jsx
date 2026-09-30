import React from 'react'


export default function Inventory({
  items
}) {
  return (
    <aside className="panel inventory">

      <span className="panel-title">
        🎒 INVENTORY
      </span>

      <div className="inventory-row">

        {items.length === 0 ? (

          <span className="muted">
            Nothing collected yet.
          </span>

        ) : (

          items.map(
            (item, index) => (

              <div
                className="inventory-item"
                key={`${item.name}-${index}`}
              >

                <span>
                  {item.icon}
                </span>

                <small>
                  {item.name}
                </small>

              </div>

            )
          )

        )}

      </div>

    </aside>
  );
}