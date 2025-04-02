NODE_ENV := production

all:
	NODE_ENV=${NODE_ENV} npx eleventy --quiet

search:
	npx -y pagefind --site _site

noisy:
	npx eleventy --serve

clean:
	rm -rf _site/*

download:
	node download.js

download-all:
	PAGE_LIMIT=100 node download.js

serve:
	NODE_ENV=dev npx eleventy --serve --quiet

rsync-delete:
	rsync -acue ssh _site/ web:/var/www/static-blog/ --delete

rsync:
	rsync -acue ssh _site/ web:/var/www/static-blog/

cp:
	rsync -au ~/proj/static-blog/_site/ /var/www/static-blog/

nginx:
	ssh web 'sudo service nginx configtest && sudo service nginx reload'

css:
	rsync -au ./assets/ ./_site/assets/
	rsync -avzue ssh ./assets/ web:/var/www/static-blog/assets/

recent:
	rm -f content/posts/downloaded/2021/04/*
	node download.js

ignore-most:
	cat .eleventyignore.base .eleventyignore.most > .eleventyignore

keep-all:
	cp .eleventyignore.base .eleventyignore

generate-all: keep-all all ignore-most search rsync nginx
	notify-send "All posts uploaded."

server-all: keep-all all cp server-nginx ignore-most

server-nginx:
	sudo service nginx reload

benchmark:
	DEBUG=Eleventy:Benchmark* npx --stack_trace_limit=200  eleventy 2>&1 | tee benchmark.log

incremental:
	NODE_ENV=${NODE_ENV} npx eleventy --quiet --ignore-initial --incremental

inc:
	NODE_ENV=${NODE_ENV} npx eleventy --quiet --ignore-initial --incremental

serve-inc:
	NODE_ENV=${NODE_ENV} npx eleventy --serve --ignore-initial --incremental
