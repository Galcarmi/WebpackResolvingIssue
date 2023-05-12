// works
require('aModuleWithMultipleEntryPoints')

// works
require('@company/aMonorepo');

// dont work
require('@company/aMonorepo/subPackage');
