
function collapseAll() {
  $('.collapsible').addClass('collapsed');
  return false;
}
function expandAll() {
  $('.collapsible.collapsed').removeClass('collapsed');
  return false;
}
function toggleVisibility() {
    var parent = $(this).closest(`.collapsible`);
    if ($(parent).hasClass('collapsed')) {
    $(parent).removeClass('collapsed');
    $(parent).attr('aria-expanded', 'true');
    } else {
    $(parent).addClass('collapsed');
    $(parent).attr('aria-expanded', 'false');
    }
}
function expandNode() {
  var element = $.find($(this).attr('href'));
  $(element).parents('.collapsed').removeClass('collapsed').attr('aria-expanded', 'true');
  return true;
}

/* Start of copy code */
// based on https://www.roboleary.net/2022/01/13/copy-code-to-clipboard-blog.html
const copyLabel = 'Copy code';

async function copyCode(block, button) {
	let code = block.querySelector('pre.src');
	let text = code.innerText;
	await navigator.clipboard.writeText(text);
	button.innerText = 'Copied';
	setTimeout(() => {
		button.innerText = copyLabel;
	}, 500);
}

function addCopyCodeButtons() {
	if (!navigator.clipboard) return;
	let blocks = document.querySelectorAll('.org-src-container');
	blocks.forEach((block) => {
		let button = document.createElement('button');
		button.innerText = copyLabel;
		button.classList.add('copy-code');
		let details = block.closest('details');
		let summary = details && details.querySelector('summary');
		if (summary) {
			summary.appendChild(button);
		} else {
			block.appendChild(button);
		}
		button.addEventListener('click', async() => {
			await copyCode(block, button);
		});
		block.setAttribute('tabindex', 0);
	});
}
document.addEventListener("DOMContentLoaded", function(event) { 
	addCopyCodeButtons();
});
/* End of copy code */

function makeCollapsible() {
  for (var i = 1; i <= 6; i++) {
    $(`.outline-${i}`).addClass('collapsible');
    $(`.outline-${i} h${i}`).addClass('heading');
    $(`.outline-text-${i}`).addClass('outline-text');
    $(`.outline-${i} > h${i}`).wrapInner($('<button/>'));
  }
  $('#table-of-contents').addClass('collapsible');
  $('#table-of-contents > h2').addClass('heading').wrapInner($('<button/>'));
  $('#table-of-contents a').click(expandNode);
  $('#table-of-contents #text-table-of-contents').addClass('outline-text');
  var links = '<a href="#" onClick="javascript:expandAll()">Expand all</a> | <a href="#" onClick="javascript:collapseAll()">Collapse all</a>';
  $('h1.title').after('<div class="expand-links">' + links + '</div>');
  $('.back-to-top').prepend(links + ' | ');
  $(`.collapsible > .heading`).on('click', '> button', toggleVisibility);
  if (window.location.hash.length > 0) {
        window.scrollTo(0, $(window.location.hash).offset().top);
  }
}
if (!document.querySelector('.skip-collapsible')) {
	makeCollapsible();
}

var urlParams = new URLSearchParams(window.location.search);
if (urlParams && urlParams.has('new-window')) {
  $('.entry a, .entry-content a').attr('target', '_blank');
  // https://css-tricks.com/snippets/jquery/find-all-internal-links/
  var siteURL = window.location.protocol + '//' + top.location.host.toString();
  var $internalLinks = $("a[href^='"+siteURL+"'], a[href^='/'], a[href^='./'], a[href^='../'], a[href^='#']");
  $internalLinks.each(function() {
    var href = $(this).attr('href');
    if (href) {
      $(this).attr('href', href + (href.match('\\?') ? '&' : '?') + 'new-window=' + urlParams.get('new-window'));
    }
  });
}

function processTOCLink() {
  document.getElementById($(this).attr('data-index')).scrollIntoView();
	window.history.replaceState(null, $(this).text(), $(this).attr('href'));
  return false;
}

$('.toc-link').click(processTOCLink);

$(document).ready(function() {
  let images = [];
	// initialize
	let bp = BiggerPicture({
		target: document.body,
	})
  function imageHandler(event) {
		bp.open({
			items: images,
			position: event.target.closest('a').getAttribute('data-index')
		});
    event.preventDefault();
  }
  $('.photoswipe').each(function (index, elem) {
    $(elem).attr('data-index', index);
    images.push({ img: elem.getAttribute('data-src'),
     //             width: elem.getAttribute('data-w'),
     //             height: elem.getAttribute('data-h'),
                  title: elem.getAttribute('data-title')});
    $(elem).click(imageHandler);
  });
});

/* audio-time */
function synchronizeHighlights() {
	// Update highlights based on subtitle changes
	document.querySelectorAll('track').forEach((track) => {
		let media = track.closest('audio, video');
		let post = track.closest('article, .audio-post, .media-post');
		if (!media || !post) return;
		// Display captions below if there is a div
		let captionsDiv = media.querySelector('.captions');
		if (captionsDiv) {
			track.addEventListener('cuechange', function() {
				captions.style.display = 'block';
				if (this.activeCues[0]?.text) {
					captions.innerText = this.activeCues[0]?.text;
				} else {
					captions.innerHTML = '&nbsp;';
				}
			});
		}
		// Look for the audio-time or media-time classes and highlight them
		let syncElems = post.querySelectorAll('.audio-time, .media-time');
		if (syncElems.length > 0) {
			track.addEventListener('cuechange', function() {
				syncElems.forEach((elem) => {
					if ((parseFloat(elem.getAttribute('data-start')) <= media.currentTime) &&
              (parseFloat(elem.getAttribute('data-stop')) > media.currentTime)) {
						elem.classList.add('highlight');
					} else {
						elem.classList.remove('highlight');
					}
				});
			});
			// Make them clickable
			syncElems.forEach((elem) => {
				elem.setAttribute('role', 'button');
				elem.addEventListener('click', function(event) {
					post.querySelectorAll('.highlight').forEach((o) => o.classList.remove('highlight'));
					media.currentTime = event.target.getAttribute('data-start');
					event.target.classList.add('highlight');
				});
			});
		}
	});
}
document.body?.classList?.add('js');
document.addEventListener('DOMContentLoaded', synchronizeHighlights);

/* Sketch gallery */
function showGallery(event, shuffled=false) {
	// initialize
	let bp = BiggerPicture({
		target: document.body,
	})

	let images = [...document.querySelectorAll('.gallery figure')].map((o) => {
		const img = o.querySelector('img');
		const link = o.querySelector('a');
		return {
			img: img.getAttribute('data-src'),
			// width: img.getAttribute('data-w'),
			// height: img.getAttribute('data-h'),
			title: img.getAttribute('title'),
			caption: `<a href="${link.getAttribute('href')}">Link</a>`
		}
	});
	if (shuffled) {
    images = images.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
  // open (will be a child of the target element above)
	bp.open({
		items: images,
	});
}

function shuffleGallery() {
  showGallery(null, true);
}

function addPanZoomToElement(svg) {
	let svgActive = false, svgHovered = false;
	svg.querySelector('.svg-pan-zoom-control')?.remove();
		svgPanZoom(svg, {
			panEnabled: true, zoomEnabled: false, fit: true, center: true, controlIconsEnabled: true,
			// from http://bumbu.me/svg-pan-zoom/demo/custom-event-handlers.html
			customEventsHandler: {
				init: function(options) {
					function updateSvgClassName() {
						options.svgElement.setAttribute('class', '' + (svgActive ? 'active' : '') + (svgHovered ? ' hovered' : ''));
					}
					this.listeners = {
						click: function () {
							if (svgActive) {
								options.instance.disableZoom();
								svgActive = false;
							} else {
								options.instance.enableZoom();
								svgActive = true;
							}
							updateSvgClassName();
						},
						mouseenter: function () {
							svgHovered = true;
							updateSvgClassName();
						},
						mouseleave: function () {
							svgActive = false;
							svgHovered = false;
							options.instance.disableZoom();
							updateSvgClassName();
						}
					};
					this.listeners.mousemove = this.listeners.mouseenter;
					for (var eventName in this.listeners) {
						options.svgElement.addEventListener(eventName, this.listeners[eventName])
					}
				},
				destroy: function (options) {
					for (var eventName in this.listeners) {
						options.svgElement.removeEventListener(eventName, this.listeners[eventName])
					}
				}
      }
		});
		const control = svg.querySelector('.svg-pan-zoom-control');
		control.setAttribute(
			'transform',
			control.getAttribute('transform').replace(/(translate\([0-9]+ )(?:[0-9]+)\)/, function(_, p1) {
				return p1 + '0)';
			}));
		svg.style.border = "1px solid black";
}

function addPanZoom() {
	document.querySelectorAll('.panzoom svg').forEach(addPanZoomToElement);
}
addPanZoom();

function stickyTocAfterScrolling() {
	const elements = document.querySelectorAll('.sticky-toc-after-scrolling');
	let lastScroll = window.scrollY;
	const cloneMap = new WeakMap();

	elements.forEach(element => {
		const clone = element.cloneNode(true);
		clone.setAttribute('class', 'sticky-toc');
		cloneMap.set(element, clone);
		element.parentNode.insertBefore(clone, element.nextSibling);
		const zoom = panZoom = svgPanZoom(clone.querySelector('svg'));
		zoom.resetZoom();
	});

	const observer = new IntersectionObserver(
		(entries) => {
			const currentScroll = window.scrollY;
			const scrollingDown = currentScroll > lastScroll;
			lastScroll = currentScroll;

			entries.forEach(entry => {
				const element = entry.target;
				const clone = cloneMap.get(element);

				if (!entry.isIntersecting && scrollingDown) {
					clone.setAttribute('class', 'sticky-toc');
					clone.style.display = 'block';
				} else if (entry.isIntersecting && !scrollingDown) {
					element.style.visibility = 'visible';
					clone.style.display = 'none';
				}
			});
		},
		{
			root: null,
			threshold: 0,
			rootMargin: '-10px 0px 0px 0px'
		}
	);

	elements.forEach(element => {
		observer.observe(element);
	});

	window.addEventListener('resize', () => {
		elements.forEach(element => {
			const clone = cloneMap.get(element);
			if (clone.style.display != 'none') {
				// reset didn't seem to work
				svgPanZoom(clone.querySelector('svg')).destroy();
				addPanZoomToElement(clone.querySelector('svg'));
			}
		});
	}, { passive: true });
}

stickyTocAfterScrolling();

function scrollToActiveTocLink() {
	const activeLink = document.querySelector('.sticky-toc .active');
	const tocContainer = document.querySelector('.sticky-toc');
  if (!activeLink || !tocContainer) return;
  const tocRect = tocContainer.getBoundingClientRect();
  const linkRect = activeLink.getBoundingClientRect();
  if (linkRect.top < tocRect.top || linkRect.bottom > tocRect.bottom) {
    const scrollPosition = linkRect.top + tocContainer.scrollTop -
                          (tocRect.height / 2) + (linkRect.height / 2);
    tocContainer.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  }
}
function handleActiveTOCLink() {
	const updateActive = function(links, active) {
		links.forEach(link => {
			link.classList.toggle('active', link.href == active)
		});
	};
	const posts = document.querySelectorAll('.post');
	const tocLinks = document.querySelectorAll('.on-this-page .toc-link');
	const options = {
		root: null,
		rootMargin: '-20% 0px -70% 0px',
		threshold: 0
	};
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const id = entry.target.id;
				const link = document.querySelector(`.toc-link[data-index="${id}"]`);
				document.querySelectorAll('.sticky-toc .active').forEach((o) => o.classList.remove('active'));
				document.querySelectorAll('.post-active').forEach((o) => o.classList.remove('post-active'));
				if (link) {
					link.classList.add('active');
					link.closest('li').classList.add('post-active');
				}
			}
		});
		scrollToActiveTocLink(document.querySelector('.sticky-toc .active'));
	}, options);
	posts.forEach((post) => { observer.observe(post); });

	const stickyTocLinks = document.querySelectorAll('article .sticky-toc a, .on-this-page a');
	const postTocObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const id = entry.target.id;
				const url = window.location.origin + window.location.pathname + '#' + id.replace(/^outline-container-/, '');
				updateActive(stickyTocLinks, url);
			}
		});
		scrollToActiveTocLink();
	}, options);

	document.querySelectorAll('article .sticky-toc').forEach((toc) => {
		const post = toc.closest('article');
		if (post) {
			post.querySelectorAll('.outline-2, .outline-3').forEach((section) => { postTocObserver.observe(section) });
		}
	});
}
handleActiveTOCLink();

function copyLink(event) {
	window.navigator.clipboard.writeText(event.target.href);
	event.preventDefault();
	console.log('should not toggle');
	return false;
}


/* Add link icons to headings and anchored paragraphs */
function addLinkIcons() {
	document.querySelectorAll('h1[id], h2[id], h3[id], p[id]').forEach((o) => {
		const link = document.createElement('a');
		const article = o.closest('article[data-url]');
		link.href = window.location.origin + (article?.getAttribute('data-url') || window.location.pathname) + '#' + o.getAttribute('id');
		link.innerHTML = '&#x1F517;';  // link icon
		link.title = 'anchor';
		link.classList.add('anchor-icon');
		link.addEventListener('click', copyLink);
		o.prepend(link);
	});
}

addLinkIcons();

function onThisDay() {
	const tz = 'America/Toronto';
  function getEffectiveDate() {
    const urlParams = new URLSearchParams(window.location.search);
    const dateParam = urlParams.get('date');
    if (dateParam && /^\d{2}-\d{2}$/.test(dateParam)) {
      const currentYear = new Date().getFullYear();
      const dateObj = new Date(`${currentYear}-${dateParam}T12:00:00Z`);
      if (dateObj.getTime()) {
        return {
          monthDay: dateParam,
          formatted: dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
        };
      }
    }
    const today = new Date(new Date().toLocaleString('en-US', { timeZone: tz }));
    return {
      monthDay: today.toISOString().substring(5, 10), // MM-DD
      formatted: today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
    };
  }
  // Fetch and process the posts
  fetch('/blog/all/index.json')
    .then(response => response.json())
    .then(posts => {
      const dateInfo = getEffectiveDate();
      const dateElement = document.querySelector('h3.date');
      if (dateElement) {
        dateElement.textContent = dateInfo.formatted;
      }
      const matchingPosts = posts.filter(post => {
        const postDate = new Date(post.date).toLocaleString('en-US', { timeZone: tz });
        const postMonthDay = (new Date(postDate)).toISOString().substring(5, 10);
        return postMonthDay === dateInfo.monthDay;
      });

      matchingPosts.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });

			const elem = document.getElementById('posts-container');
      if (matchingPosts.length > 0) {
        const postsHTML = matchingPosts.map(post => {
          const postDate = new Date(post.date).toLocaleString('en-US', { timeZone: tz });
          const postYear = new Date(postDate).getFullYear();
          return `<li>${postYear}: <a href="${post.permalink}">${post.title}</a></li>`;
        }).join('\n');
        elem.innerHTML = `<ul>${postsHTML}</ul>`;
      } else {
        elem.innerHTML = `<p>No posts were written on ${dateInfo.formatted}.</p>`;
      }
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
    });
}
