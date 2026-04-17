# Before code commit Check List:

1.) should be no console error - DONE

2.) should be pass all test cases without warning or errors - DONE

3.) No linting error - DONE

4.) your branch should be merged with dev befor creating PR - DONE

5.) After creating PR you need to verify the diff (The changes you were expecting is there and no other unexpected changes)

6.) WCAG Guideline Cover : DONE

7.) Test Case Update : DONE

8.) npm run lint (There should be no linting error)

## Common Code practices to follow:

1.Always use key when render the list.
[{id:1,title:’hello’}].map(({id,title})=><div key={id}>component</div>)

2.Do not use index as key.

3.Use <> instead of <React.Fragment> for code consistency.(any one of them)

4.Don't use backtick string interpolation for single variable className={`${styles.test}`} => className={styles.test} language={`en`} => language="en"

5.Need to take care of console errors and warnings.

6.Do not use setState in loop.

7.Use stateless component where state is not required or needed(Use hooks).

8.Use React.Fragment instated of div or other html elements.

9.Use small functions, each with a single responsibility. This is called the single responsibility principle. Ensure that each function does one job and does it well. This could mean breaking up complex components into many smaller ones. This also will lead to better testability.

10.Follow strict linting rules. This will help you write clean, consistent code.

11.Object destructuring:
// Dirty componentWillReceiveProps(newProps) {
this.setState({ active: newProps.active });
}
// Clean componentWillReceiveProps({ active }) {
this.setState({ active });
}

12.Array destructuring:
// Dirty const splitLocale = locale.split('-');
const language = splitLocale[0];
const country = splitLocale[1];

    // Clean const [language, country] = locale.split('-');

13.Don't disable eslint rules in file

14.Add prefix `handle` for handler it helps to understanding the code and maintain consistency.
Exp: <button onClick={handleQuantityChange}>Change Quantity</button>
