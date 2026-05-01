ru_alphabet = new Map([
    // Специальные символы
    ['!', 1], ['"', 2], ['#', 3], ['№', 4], [';', 5], ['%', 6], 
    [':', 7], ['?', 8], ['*', 9], ['(', 10], [')', 11], ['@', 12], ['$', 13], 
    [',', 14], ['.', 15], ['—', 16], ['-', 17], ['–', 18], ['+', 19], ['=', 20],
    ['/', 21], ['\\', 22],
  
    // Цифры
    ['0', 23], ['1', 24], ['2', 25], ['3', 26], ['4', 27], ['5', 28], ['6', 29], 
    ['7', 30], ['8', 31], ['9', 32],
  
    // Заглавные буквы
    ['А', 33], ['Б', 34], ['В', 35], ['Г', 36], ['Д', 37], ['Е', 38], ['Ё', 39], 
    ['Ж', 40], ['З', 41], ['И', 42], ['Й', 43], ['К', 44], ['Л', 45], ['М', 46],
    ['Н', 47], ['О', 48], ['П', 49], ['Р', 50], ['С', 51], ['Т', 52], ['У', 53], 
    ['Ф', 54], ['Х', 55], ['Ц', 56], ['Ч', 57], ['Ш', 58], ['Щ', 59], ['Ъ', 60], 
    ['Ы', 61], ['Ь', 62], ['Э', 63], ['Ю', 64], ['Я', 65],
  
    // Строчные буквы
    ['а', 66], ['б', 67], ['в', 68], ['г', 69], ['д', 70], ['е', 71], ['ё', 72], 
    ['ж', 73], ['з', 74], ['и', 75], ['й', 76], ['к', 77], ['л', 78], ['м', 79], 
    ['н', 80], ['о', 81], ['п', 82], ['р', 83], ['с', 84], ['т', 85],
    ['у', 86], ['ф', 87], ['х', 88], ['ц', 89], ['ч', 90], ['ш', 91], ['щ', 92],
    ['ъ', 93], ['ы', 94], ['ь', 95], ['э', 96], ['ю', 97], ['я', 98],
  
    // Пробел
    [' ', 99]
  ]);

en_alphabet = new Map([
    // Special symbols
    ['!', 1], ['"', 2], ['#', 3], ['$', 4], ['%', 5], ['&', 6],
    ["'", 7], ['(', 8], [')', 9], ['*', 10], ['+', 11], [',', 12],
    ['-', 13], ['.', 14], ['/', 15], [':', 16], [';', 17], ['<', 18],
    ['=', 19], ['>', 20], ['?', 21], ['@', 22], ['[', 23], ['\\', 24],
    [']', 25], ['^', 26], ['_', 27], ['', 28], ['{', 29], ['|', 30],
    ['}', 31], ['~', 32],
  
    // Numbers
    ['0', 33], ['1', 34], ['2', 35], ['3', 36], ['4', 37], ['5', 38], ['6', 39], 
    ['7', 40], ['8', 41], ['9', 42],
  
    // Uppercase letters
    ['A', 43], ['B', 44], ['C', 45], ['D', 46], ['E', 47], ['F', 48], ['G', 49],
    ['H', 50], ['I', 51], ['J', 52], ['K', 53], ['L', 54], ['M', 55], ['N', 56],
    ['O', 57], ['P', 58], ['Q', 59], ['R', 60], ['S', 61], ['T', 62], ['U', 63],
    ['V', 64], ['W', 65], ['X', 66], ['Y', 67], ['Z', 68],
  
    // Lowercase letters
    ['a', 69], ['b', 70], ['c', 71], ['d', 72], ['e', 73], ['f', 74], ['g', 75],
    ['h', 76], ['i', 77], ['j', 78], ['k', 79], ['l', 80], ['m', 81], ['n', 82],
    ['o', 83], ['p', 84], ['q', 85], ['r', 86], ['s', 87], ['t', 88], ['u', 89],
    ['v', 90], ['w', 91], ['x', 92], ['y', 93], ['z', 94],
  
    // Space
    [' ', 95]
]);
(function( $ ) {

    $.ec = {
        reals: {},
        modk: {},
    };

    var colors = {
        red: "#DB521A",
        yellow: "#FEA425",
        blue: "#1B5045",
    };

    /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cbrt#Polyfill */
    Math.cbrt = Math.cbrt || function(x) {
        var y = Math.pow(Math.abs(x), 1 / 3);
        return x < 0 ? -y : y;
    };

    var sortUnique = function( arr ) {
        // Sorts an array of numbers and removes duplicate elements in place.

        arr.sort(function( a, b ) {
            return a - b;
        });

        for( var i = 1; i < arr.length; i += 1 ) {
            if( arr[ i ] === arr[ i - 1 ] ) {
                arr.splice( i, 1 );
                i -= 1;
            }
        }
        return arr;
    };
    // function for finding the inverse val n modulo p
    var inverseOf = function( n, p ) {
        n = ( +n ) % p;

        if( n < 0 ) {
            n = n + p;
        }

        for( var m = 0; m < p; m += 1 ) {
            if( ( n * m ) % p === 1 ) {
                return m;
            }
        }

        return NaN;
    };

    var round10 = function( value, exp ) {
        // This code has been copied and adapted from the MDN:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round.

        if( typeof exp === "undefined" ) {
            exp = -5;
        }

        // If the exp is undefined or zero...
        if ( +exp === 0 ) {
            return Math.round( value );
        }

        value = +value;
        exp = +exp;

        // If the value is not a number or the exp is not an integer...
        if ( isNaN( value ) || typeof exp !== "number" || exp % 1 !== 0 ) {
          return NaN;
        }

        // Left shift.
        value = value.toString().split( "e" );
        value = Math.round( +( value[ 0 ] + "e" +
                            ( value[ 1 ] ? ( +value[ 1 ] - exp ) : -exp ) ) );

        // Shift back.
        value = value.toString().split( "e" );
        return +( value[0] + "e" +
                  ( value[ 1 ] ? ( +value[ 1 ] + exp ) : exp ) );
    };

    var setInputValuesFromHash = function() {
        var hash = window.location.search;

        if( hash[ 0 ] === "?" ) {
            hash = hash.substr( 1 );
        }

        var items = hash.split( "&" );

        for( var i = 0; i < items.length; i += 1 ) {
            var item = items[ i ].split( "=" );
            var name = item[ 0 ];
            var value = item[ 1 ];

            if( item.length !== 2 ||
                !name ||
                !value ||
                /[^a-z]/.test( name ) ||
                /[^-.0-9]/.test( value ) ) {
                continue;
            }

            $( "input[name='" + name + "']" ).val( value );
        }
    };

    var isPrime = function( n ) {
        n = +n;

        if( n < 2 || n % 2 === 0 ) {
            return n === 2;
        }

        for( var m = 3; m < n; m += 2 ) {
            if( n % m === 0 ) {
                return false;
            }
        }

        return true;
    };

    ///////////////////////////////////////////////////////////////////////////
    // $.ec.Base

    $.ec.Base = function() {
        setInputValuesFromHash();

        this.aInput = $( "input[name='a']" );
        this.bInput = $( "input[name='b']" );
        this.plotContainer = $( "#plot" );
        this.equationContainer = $( ".curve-equation" );
        this.singularWarning = $( ".curve-singular-warning" );

        this.marginFactor = 1 / 8;

        // this.plot = $.plot( this.plotContainer, {} );

        var curve = this;
        $().add( this.aInput )
           .add( this.bInput )
           .change(function() { curve.update(); });

        $(function() { curve.update(); });
    };

    $.ec.Base.prototype.whiteBackground = function() {
        var grid = this.plot.getOptions().grid;
        grid.backgroundColor = "#ffffff";
    };

    $.ec.Base.prototype.getRoots = function( a, b ) {
        // Returns an array containing the coordinates of the points where the
        // curve intersects the x-axis. This means solving the equation:
        //
        //     x^3 + ax + b = 0
        //
        // This function uses a simplified variant of the method for cubic
        // functions:
        // http://en.wikipedia.org/wiki/Cubic_function#Roots_of_a_cubic_function

        if( typeof a === "undefined" ) {
            a = this.a;
        }
        if( typeof b === "undefined" ) {
            b = this.b;
        }

        var roots;
        var q = a / 3;
        var r = -b / 2;
        var delta = q * q * q + r * r;

        if( delta > 0 ) {
            var s = Math.cbrt( r + Math.sqrt( delta ) );
            var t = Math.cbrt( r - Math.sqrt( delta ) );
            roots = [ s + t ];
        }
        else if( delta < 0 ) {
            var s = Math.acos( r / Math.sqrt( -q * q * q ) );
            var t = 2 * Math.sqrt( -q );
            roots = [
                t * Math.cos( s / 3 ),
                t * Math.cos( ( s + 2 * Math.PI ) / 3 ),
                t * Math.cos( ( s + 4 * Math.PI ) / 3 )
            ]
        }
        else {
          roots = [
              2 * Math.cbrt( r ),
              Math.cbrt( -r )
          ]
        }

        return sortUnique( roots );
    };

    $.ec.Base.prototype.addPoints = function( p0, p1 ) {
        throw new Error( "must override" );
    };

    $.ec.Base.prototype.negPoint = function( p ) {
        throw new Error( "must override" );
    };

    $.ec.Base.prototype.mulPoint = function( n, p ) {
        // Returns the result of n * P = P + P + ... (n times).

        if( n === 0 || p === null ) {
            return null;
        }


        if( n < 0 ) {
            n = -n;
            p = this.negPoint( p );
        }

        var q = null;

        while( n ) {
            if( n & 1 ) {
                q = this.addPoints( p, q );
            }

            p = this.addPoints( p, p );
            n >>= 1;
        }

        return q;
    };

    $.ec.Base.prototype.getPlotRange = function( points ) {
        // Finds a range for the x-axis and the y-axis. This range shows all
        // the given points.

        if( typeof points === "undefined" ) {
            points = [];
        }

        var xMin = Infinity;
        var xMax = -Infinity;
        var yMin = Infinity;
        var yMax = -Infinity;

        for( var i = 0; i < points.length; i += 1 ) {
            var p = points[ i ];
            if( p === null ) {
                continue;
            }
            xMin = Math.min( xMin, p[ 0 ] );
            xMax = Math.max( xMax, p[ 0 ] );
            yMin = Math.min( yMin, p[ 1 ] );
            yMax = Math.max( yMax, p[ 1 ] );
        }

        if( this.marginFactor ) {
            // Add some margin for better display.
            var xMargin = this.marginFactor * ( xMax - xMin );
            var yMargin = this.marginFactor * ( yMax - yMin );

            // Adjust proportions so that x:y = 1.
            if( xMargin > yMargin ) {
                yMargin = ( ( xMax - xMin ) - ( yMax - yMin ) ) / 2 + xMargin;
            }
            else {
                xMargin = ( ( yMax - yMin ) - ( xMax - xMin ) ) / 2 + yMargin;
            }

            if( xMargin === 0 ) {
                // This means that xMax = xMin and yMax = yMin, which is not
                // acceptable.
                xMargin = 5;
                yMargin = 5;
            }
        }
        else {
            var xMargin = 0;
            var yMargin = 0;
        }

        return {
            xMin: xMin - xMargin, xMax: xMax + xMargin,
            yMin: yMin - yMargin, yMax: yMax + yMargin
        }
    };

    $.ec.Base.prototype.getPlotData = function() {
        return [];
    };

    $.ec.Base.prototype.makeLabel = function( name, color ) {
        return $( "<label class='point-label'></label>" )
            .text( name )
            .css({
                "position": "absolute",
                "width": "1em",
                "line-height": "1em",
                "text-align": "center",
                "border-radius": "50%",
                "opacity": "0.8",
                "background-color": color
            })
            .appendTo( this.plotContainer );
    };

    $.ec.Base.prototype.getInputValues = function() {
        this.a = +this.aInput.val();
        this.b = +this.bInput.val();
    };

    $.ec.Base.prototype.recalculate = function() {
        // Order is important.
        this.roots = this.getRoots();
        this.plotRange = this.getPlotRange();
    };

    $.ec.Base.prototype.updateResults = function() {
        var getTerm = function( value, suffix ) {
            if( value > 0 ) {
                return " + " + value + suffix;
            }
            else if( value < 0 ) {
                return " - " + ( -value ) + suffix;
            }
            else {
                return "";
            }
        };

        this.equationContainer.html( "<em>y</em><sup>2</sup> = " +
                                     "<em>x</em><sup>3</sup> " +
                                     getTerm( this.a, "<em>x</em>" ) +
                                     getTerm( this.b, "" ) );

        this.singularWarning.css( "display",
                                  this.singular ? "block" : "none" );
    };

    $.ec.Base.prototype.update = function() {
        this.getInputValues();
        this.recalculate();
        this.updateResults();
    };

    ///////////////////////////////////////////////////////////////////////////
    // $.ec.modk.Base

    $.ec.modk.Base = function() {
        $.ec.Base.call( this );

        this.marginFactor = 0;
        this.kInput = $( "input[name='p']" );

        this.compositeWarning = $( ".composite-warning" );
        this.fieldOrder = $( ".field-order" );
        this.curveOrder = $( ".curve-order" );

        var curve = this;
        this.kInput.change(function() { curve.update() });
    };

    $.ec.modk.Base.prototype = Object.create(
        $.ec.Base.prototype );
    $.ec.modk.Base.prototype.constructor = $.ec.modk.Base;

    $.ec.modk.Base.prototype.getY = function( x ) {
        // Returns all the possible ordinates corresponding to the given
        // coordinate.

        var result = [];

        for( var i = 0; i < this.curvePoints.length; i += 1 ) {
            var p = this.curvePoints[ i ];
            if( p[ 0 ] === x ) {
                result.push( p[ 1 ] );
            }
        }

        return result;
    };

    $.ec.modk.Base.prototype.getX = function( y ) {
        // Returns all the possible coordinates corresponding to the given
        // ordinate.

        var result = [];

        for( var i = 0; i < this.curvePoints.length; i += 1 ) {
            var p = this.curvePoints[ i ];
            if( p[ 1 ] === y ) {
                result.push( p[ 2 ] );
            }
        }

        return result;
    };

    $.ec.modk.Base.prototype.hasPoint = function( x, y ) {
        // Returns true if the point x,y belongs to the curve.

        for( var i = 0; i < this.curvePoints.length; i += 1 ) {
            var p = this.curvePoints[ i ];
            if( p[ 0 ] === x && p[ 1 ] === y ) {
                return true;
            }
        }

        return false;
    };

    $.ec.modk.Base.prototype.inverseOf = function( n ) {
        n = ( +n ) % this.k;

        if( n < 0 ) {
            n = n + this.k;
        }

        for( var m = 0; m < this.k; m += 1 ) {
            if( ( n * m ) % this.k === 1 ) {
                return m;
            }
        }

        return NaN;
    };

    $.ec.modk.Base.prototype.addPoints = function( p1, p2 ) {
        // Returns the result of adding point p1 to point p2, according to the
        // group law for elliptic curves. The point at infinity is represented
        // as null.

        if( p1 === null ) {
            return p2;
        }
        if( p2 === null ) {
            return p1;
        }

        var x1 = p1[ 0 ];
        var y1 = p1[ 1 ];
        var x2 = p2[ 0 ];
        var y2 = p2[ 1 ];
        var m;

        if( x1 !== x2 ) {
            // Two distinct points.
            m = ( y1 - y2 ) * this.inverseOf( x1 - x2 );
        }
        else {
            if( y1 === 0 && y2 === 0 ) {
                // This may only happen if p1 = p2 is a root of the elliptic
                // curve, hence the line is vertical.
                return null;
            }
            else if( y1 === y2 ) {
                // The points are the same, but the line is not vertical.
                m = ( 3 * x1 * x1 + this.a ) * this.inverseOf( 2 * y1 );
            }
            else {
                // The points are not the same and the line is vertical.
                return null;
            }
        }

        m %= this.k;

        var x3 = ( m * m - x1 - x2 ) % this.k;
        var y3 = ( m * ( x1 - x3 ) - y1 ) % this.k;

        if( x3 < 0 ) {
            x3 += this.k;
        }
        if( y3 < 0 ) {
            y3 += this.k;
        }

        return [ x3, y3 ];
    };

    $.ec.modk.Base.prototype.negPoint = function( p ) {
        return [ p[ 0 ], this.k - p[ 1 ] ];
    };

    $.ec.modk.Base.prototype.getPlotRange = function( points ) {
        // Finds a range for the x-axis and the y-axis. This range must:
        //
        // 1. show all the given points (if any);
        // 2. show the most interesting points of the curve (stationary points
        //    and roots);
        // 3. be proportional: i.e. the x-length and the y-length must be the
        //    same.

        if( typeof points === "undefined" ) {
            points = [];
        }
        else {
            points = points.slice( 0 );
        }

        points.push([ 0, 0 ]);
        points.push([ this.k - 1, this.k - 1 ]);

        return $.ec.Base.prototype.getPlotRange.call( this, points );
    };

    $.ec.modk.Base.prototype.getCurvePoints = function() {
        // Returns a list of x,y points belonging to the curve from xMin to
        // xMax. The resulting array is ordered and may contain some null
        // points in case of discontinuities.

        var points = [];

        for( var x = 0; x < this.k; x += 1 ) {
            for( var y = 0; y < this.k; y += 1 ) {
                if( ( y * y - x * x * x - this.a * x - this.b ) % this.k
                        === 0 ) {
                    points.push([ x, y ]);
                }
            }
        }

        // console.log(points);
        return points;
    };

    $.ec.modk.Base.prototype.getLinePoints = function( p, q ) {
        var m = ( p[ 1 ] - q[ 1 ] ) * this.inverseOf( p[ 0 ] - q[ 0 ] );

        if( isNaN( m ) ) {
            if( p[ 1 ] === q[ 1 ] ) {
                // We are in the case p === q.
                m = ( 3 * p[ 0 ] * p[ 0 ] + this.a ) *
                    this.inverseOf( 2 * p[ 1 ] );
            }
            else {
                // This is a vertical line.
                return [ [ p[ 0 ], this.plotRange.yMin ],
                         [ p[ 0 ], this.plotRange.yMax ] ];
            }
        }

        if( m === 0 ) {
            // This is a horizontal line and p[ 1 ] === q[ 1 ].
            return [ [ this.plotRange.xMin, p[ 1 ] ],
                     [ this.plotRange.xMax, p[ 1 ] ] ];
        }

        m %= this.k;

        // m can be either a negative or a positive number (for example, if we
        // have k = 7, m = -1 and m = 6 are equivalent). Technically, it does
        // not make any difference. Choose the one with the lowest absolute
        // value, as this number will produce fewer lines, resulting in a nicer
        // plot.
        if( m < 0 && -m > m + this.k ) {
            m += this.k;
        }
        else if( m > 0 && -m < m - this.k ) {
            m -= this.k;
        }

        var y;
        var x;
        var q = p[ 1 ] - m * p[ 0 ];
        var points = [];

        // Find the q corresponding to the "leftmost" line. This is the q that
        // when used in the equation y = m * x + q and x = 0 gives 0 <= y < k.
        while( q >= this.k ) {
            q -= this.k;
        }
        while( q < 0 ) {
            q += this.k;
        }

        points.push([ this.plotRange.xMin, m * this.plotRange.xMin + q ]);

        do {
            if( m > 0 ) {
                // The line has a positive slope; find the coordinate of the
                // point having the highest ordinate. If the line equation is:
                // y = m * x + q, then the point coordinate is given by:
                // k = m * x + q.
                y = this.k;
            }
            else {
                // Slope is negative; find the coordinate of the point having
                // the lowest ordinate. If the line equation is: y = m * x + q,
                // then the point coordinate is given by: 0 = m * x + q.
                y = 0;
            }

            x = ( y - q ) / m;

            points.push([ x, y ]);
            points.push( null );

            points.push([ x, y ? 0 : this.k ]);

            if( m > 0 ) {
                q -= this.k;
            }
            else {
                q += this.k;
            }
        } while( x < this.k );

        points.push([ this.plotRange.xMax, m * this.plotRange.xMax + q ]);

        return points;
    };

    $.ec.modk.Base.prototype.getPlotData = function() {
        var data = $.ec.Base.prototype.getPlotData.call( this );

        data.push({
            color: colors.blue,
            data: this.curvePoints,
            points: { show: true, radius: 2, fillColor: colors.blue }
        });

        return data;
    };

    $.ec.modk.Base.prototype.fixPointCoordinate = function( xInput, yInput ) {
        // Adjusts the x,y coordinates of a point so that it belongs to the
        // curve.

        var xVal = +xInput.val();
        var yVal = +yInput.val();
        var xPrevVal = +xInput.data( "prev" );
        var yPrevVal = +yInput.data( "prev" );

        if( isNaN( xVal ) || isNaN( yVal ) ) {
            // The user inserted an invalid number.
            return [ xPrevVal, yPrevVal ];
        }

        if( this.hasPoint( xVal, yVal ) ) {
            // This point exists -- nothing to do.
            return [ xVal, yVal ];
        }

        // Find a list of candidate points that respect the direction of the
        // change.
        if( xVal > xPrevVal ) {
            var check = function( p ) {
                return p[ 0 ] > xPrevVal;
            }
        }
        else if( xVal < xPrevVal ) {
            var check = function( p ) {
                return p[ 0 ] < xPrevVal;
            }
        }
        else if( yVal > yPrevVal ) {
            var check = function( p ) {
                return p[ 1 ] > yPrevVal;
            }
        }
        else if( yVal < yPrevVal ) {
            var check = function( p ) {
                return p[ 1 ] < yPrevVal;
            }
        }
        else {
            // Neither xVal nor yVal have changed (but probably a, b or k
            // have).
            var check = function( p ) {
                return true;
            }
        }

        var candidates = [];

        for( var i = 0; i < this.curvePoints.length; i += 1 ) {
            var p = this.curvePoints[ i ];
            if( check( p ) ) {
                candidates.push( p );
            }
        }

        if( candidates.length === 0 ) {
            if( this.hasPoint( xPrevVal, yPrevVal ) ) {
                // There are no candidates and the previous point is still
                // valid.
                xInput.val( xPrevVal );
                yInput.val( yPrevVal );
                return [ xPrevVal, yPrevVal ];
            }

            // There are no candidates but the previous point is no longer
            // valid (this may happen if a, b or k have changed).
            candidates = this.curvePoints;

            if( candidates.length === 0 ) {
                // Nothing to do.
                return [ xPrevVal, yPrevVal ];
            }
        }

        var distances = candidates.map(function( p ) {
            var deltaX = xVal - p[ 0 ];
            var deltaY = yVal - p[ 1 ];
            return deltaX * deltaX + deltaY * deltaY;
        });
        var lowestDistance = Math.min.apply( null, distances );

        var p = candidates[ distances.indexOf( lowestDistance ) ];

        xInput.val( p[ 0 ] );
        yInput.val( p[ 1 ] );

        xInput.data( "prev", p[ 0 ] );
        yInput.data( "prev", p[ 1 ] );
        // console.log([ p[ 0 ], p[ 1 ] ]);
        return [ p[ 0 ], p[ 1 ] ];
    };

    $.ec.modk.Base.prototype.getInputValues = function() {
        $.ec.Base.prototype.getInputValues.call( this );

        this.k = +this.kInput.val();
        this.prime = isPrime( this.k );

        // This must go here, rather than in recalculate(), because
        // fixPointCoordinates() depends on curvePoints.
        this.curvePoints = this.getCurvePoints();
    };

    $.ec.modk.Base.prototype.updateResults = function() {
        $.ec.Base.prototype.updateResults.call( this );
        this.compositeWarning.css({ "display":
                                    this.prime ? "none" : "block" });
        this.fieldOrder.text( this.k );
        this.curveOrder.text( this.curvePoints.length + 1 );
    };


    ///////////////////////////////////////////////////////////////////////////
    // $.ec.modk.ScalarMultiplication

    $.ec.modk.ScalarMultiplication = function() {
        $.ec.modk.Base.call( this );
        // $.ec.modk.Base.prototype.recalculate.call( this );

        this.nInput = $( "input[name='n']" );
        this.pxInput = $( "input[name='px']" );
        this.pyInput = $( "input[name='py']" );
        this.qxInput = $( "input[name='qx']" );
        this.qyInput = $( "input[name='qy']" );
        // this.keyInput = $( "input[name='private-key']" );
        this.pkxInput = $( "input[name='pkx']" );
        this.pkyInput = $( "input[name='pky']" );
        this.qkxInput = $( "input[name='qkx']" );
        this.qkyInput = $( "input[name='qky']" );

        this.subgroupOrder = $( ".subgroup-order" );

        this.pxInput.data( "prev", this.pxInput.val() );
        this.pyInput.data( "prev", this.pyInput.val() );

        var curve = this;
        
        $().add( this.nInput )
           .add( this.pxInput )
           .add( this.pyInput ).add(this.keyInput)
           .change(function() { curve.update(); });
    };

    $.ec.modk.ScalarMultiplication.prototype =
        Object.create( $.ec.modk.Base.prototype );
    $.ec.modk.ScalarMultiplication.prototype.constructor =
        $.ec.modk.ScalarMultiplication;

        
        
    $.ec.modk.ScalarMultiplication.prototype.getSubgroupOrder = function() {
        if( this.singular || !this.prime ) {
            return 0;
        }

        var n = 2;
        var q = this.addPoints( this.p, this.p );

        while( q !== null ) {
            q = this.addPoints( this.p, q );
            n += 1;
        }

        return n;
    };

    $.ec.modk.ScalarMultiplication.prototype.getInputValues = function() {
        $.ec.modk.Base.prototype.getInputValues.call( this );
        this.n = +this.nInput.val();
        this.p = this.fixPointCoordinate( this.pxInput, this.pyInput );
    };

    $.ec.modk.ScalarMultiplication.prototype.recalculate = function() {
        this.q = this.mulPoint( this.n, this.p );
        $.ec.modk.Base.prototype.recalculate.call( this );
    };

    $.ec.modk.ScalarMultiplication.prototype.updateResults = function() {
        $.ec.modk.Base.prototype.updateResults.call( this );

        if( this.q !== null ) {
            this.qxInput.val( round10( this.q[ 0 ] ) );
            this.qyInput.val( round10( this.q[ 1 ] ) );
        }
        else {
            this.qxInput.val( "Inf" );
            this.qyInput.val( "Inf" );
        }

        this.subgroupOrder.text( this.getSubgroupOrder() );
    };

    // $.ec.modk.Decryption /////////////////////////////////////
    $.ec.modk.Decryption  = function()  {
        var encdata = this;

        this.mesInput = $( "textarea[name='mes']" );
        this.pInput = $( "input[name='p']" );
        this.nInput = $( "input[name='n']" );
        this.qxInput = $( "input[name='qx']" );
        this.qyInput = $( "input[name='qy']" );
        this.keyInput = $( "input[name='private-key']" );
        this.pkxInput = $( "input[name='pkx']" );
        this.pkyInput = $( "input[name='pky']" );
        this.qkxInput = $( "input[name='qkx']" );
        this.qkyInput = $( "input[name='qky']" );
        // this.xqInput = $( "input[name='xq']" );
        console.log(this.mesInput.val());  
        // console.log(this.qyInput.val());

        $().add( this.mesInput )
            .add( this.nInput )
            .add( this.qxInput  )
            .add( this.qyInput )
            .add( this.keyInput  )
            .add( this.pkxInput )
            .add( this.pkyInput )
            .add( this.qkxInput ).add( this.qkyInput)
            .change(function() { encdata.update(); });
        
        this.getLang = function () {
                var lang = $("select[name='language']").val();
                console.log(lang);
                return lang;
        };
        
        // Получаем словарь по выбранному языку
        this.getAlphabet = function () {
                var lang = this.getLang();
                var alphabet = lang === "ru" ? ru_alphabet : en_alphabet;
                return alphabet;
         };
        
         //поиск букв по числу
        function getKey(value, map) {
            return [...map].find(([key, val]) => val == value)[0]
        }
        
            //получаем порядок подгруппы
        this.subgroupOrder = $( ".subgroup-order" );
        this.subgroupOrderToInt = function() {
            return parseInt(this.subgroupOrder.text(), 10);
        };
        var Subgroup = this.subgroupOrderToInt();
        console.log(`Порядок подгруппы: ${Subgroup}`);
        
        this.getPrivateKey = function(Subgroup) {
            min = 1;
            max = Math.floor(Subgroup-1);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        var PrivateKey = this.getPrivateKey(Subgroup);
        this.keyInput.val( PrivateKey );
        var module = this.pInput.val();

        var inverse  = inverseOf(this.qxInput.val(),  module);

        document.querySelector("input[name='x-1']").value  = inverse;
        scifr = this.mesInput.val();
        this.decryptedMesNumbers = [];
        this.decryptedMesNumbers = decrypt(scifr, this.qxInput.val(),  module);
        // Перевод чисел в буквы по выбранному словарю
        this.getLetters = function () {
            var alphabet = this.getAlphabet();
            var mes = this.decryptedMesNumbers;
            var letters = [];
            
            for (var i = 0; i < mes.length; i++) {
                letters.push(getKey(mes[i],  alphabet));
            }
            console.log(letters);
            return letters;
        };
        result = this.getLetters();
        document.querySelector("textarea[name='decr-result']").value  = result.join("");
    };

    function decrypt(scifr, xq, module) {
        var inverse  = inverseOf(xq,  module);
        // console.log("Обратное: ", inverse);
       // Инициализация зашифрованного массива
       const decryptedMesNumbers = [];
     //   Разделение зашифрованного сообщения на блоки, равные порядку модуля
        const blocks = scifr.match(new RegExp('.{1,' + module.toString().length + '}', 'g'));
        console.log(blocks);
      
        for (let i = 0; i < blocks.length; i++) {
            // Удаление ведущих нулей из блока, пока не встретится число, отличное от 0
            let block = blocks[i];
            while (block[0] === '0' && block.length > 1) {
            block = block.slice(1);
            }
            // Преобразование блока в число
            let num = parseInt(block, 10);
            console.log(num);
            // Вычисление расшифрованного значения
            let t = (num * inverse) % module;
            console.log(t);
            // Добавление расшифрованного символа в массив
            decryptedMesNumbers.push(t);
        }
        //Возврат массива расшифрованных символов
        console.log("result: ", decryptedMesNumbers);
        return decryptedMesNumbers;
    }

    $.ec.modk.Decryption.prototype = Object.create( $.ec.modk.Base.prototype );
    $.ec.modk.Decryption.prototype.constructor = $.ec.modk.Decryption;
    $.ec.modk.Decryption.prototype.recalculate = function() {
        $.ec.modk.ScalarMultiplication.prototype.recalculate.call(this);
        $.ec.modk.ScalarMultiplication.prototype.updateResults.call(this);
    };
    //добавить отдельную кнопку для генерации случайного ключа
    //добавить возможность введения ключа пользователем только в пределах от 1 до n-1
}( jQuery ));
