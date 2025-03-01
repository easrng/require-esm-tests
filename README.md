# require(esm) tests

a collection of tests for require(esm) behavior in various edge cases

rollup and vite results are empty right now because they throw an unrecoverable
error

these tests omit Symbol.toStringTag and normalize `get, set` to
`value, writable` on descriptors to make it easier to identify meaningful
differences in behavior
