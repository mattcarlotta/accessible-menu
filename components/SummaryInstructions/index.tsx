import KeyIcon from '../KeyIcon'

export default function SummaryInstructions() {
  return (
    <div className="bg-gray bg-opacity-30 p-4 my-2 space-y-4">
      <div>
        Press&nbsp;
        <KeyIcon height="4em" width="4em">
          Tab
        </KeyIcon>
        and/or
        <KeyIcon height="4em" width="4em">
          Shift
        </KeyIcon>
        <span className="font-bold font-5xl">+</span>
        <KeyIcon height="4em" width="4em">
          Tab
        </KeyIcon>
        to navigate across the collapsible menus.
      </div>
      <div>
        <strong>When a menu is closed:</strong>
        <ul className="list-disc pl-6">
          <li>
            Press
            <KeyIcon height="4em" width="4em">
              Enter
            </KeyIcon>
            or
            <KeyIcon height="4em" width="4em">
              Space
            </KeyIcon>
            (or left mouse click) to <strong>open</strong> and&nbsp;
            <strong>close</strong> the menu.
          </li>
        </ul>
      </div>
      <div>
        <strong>When a menu is opened:</strong>
        <ul className="list-disc pl-6">
          <li>
            Press&nbsp;
            <KeyIcon height="4em" width="4em">
              Tab
            </KeyIcon>
            and/or
            <KeyIcon height="4em" width="4em">
              Shift
            </KeyIcon>
            <span className="font-bold font-5xl">+</span>
            <KeyIcon height="4em" width="4em">
              Tab
            </KeyIcon>
            to navigate across the menu items.
          </li>
          <li>
            Press
            <KeyIcon height="4em" width="4em">
              Enter
            </KeyIcon>
            (or left mouse click) to <strong>select</strong> a menu item.
          </li>
        </ul>
      </div>
    </div>
  )
}
