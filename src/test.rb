require 'tsort'

class Hash
  include TSort
  alias tsort_each_node each_key
  def tsort_each_child(node, &block)
    fetch(node).each(&block)
  end
end

# tarjan wikipedia example
puts({ 1 => [3], 2 => [1, 4], 3 => [2, 4], 4 => [5], 5 => [4, 8], 6 => [5, 7], 7 => [8, 6], 8 => [] }.strongly_connected_components.inspect)


# https://github.com/bwesterb/py-tarjan
g = { 1 => [2], 2 => [1, 5], 3 => [4], 4 => [3, 5], 5 => [6], 6 => [7], 7 => [8], 8 => [6, 9], 9 => [] }

each_node = lambda {|&b| g.each_key(&b) }
each_child = lambda {|n, &b| g[n].each(&b) }

TSort.strongly_connected_components(each_node, each_child).each do |component|
  puts(component.inspect)
end


